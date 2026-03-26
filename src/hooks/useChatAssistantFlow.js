import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalRuntime } from '@assistant-ui/react'
import {
  conversationModes,
  createChatFlowResult,
  createScannerFlowResult,
  getAssistantResponseDelayMs,
} from '../lib/chat/assistantFlow.js'
import { createLocalAttachmentAdapter } from '../lib/chat/localAttachmentAdapter.js'
import {
  generateChatSessionId,
  loadChatSessions,
  upsertChatSessionRecord,
} from '../lib/chat/chatSessionStorage.js'

const COMPOSER_INPUT_ID = 'assistant-composer-input'
const SAVE_FEEDBACK_DURATION_MS = 2200
const BUSINESS_SAVE_KEYWORDS = [
  'bisnis',
  'usaha',
  'strategi',
  'penjualan',
  'stok',
  'promosi',
  'pelanggan',
  'marketing',
  'omzet',
  'omset',
  'profit',
  'margin',
]

function getLastUserText(message) {
  if (!message?.content) {
    return ''
  }

  const textPart = message.content.find((part) => part.type === 'text')
  return textPart?.text?.trim() ?? ''
}

function getLastUserAttachmentName(message) {
  return message?.attachments?.[0]?.name ?? ''
}

function scrollToElement(element) {
  window.requestAnimationFrame(() => {
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

function focusComposer() {
  window.requestAnimationFrame(() => {
    document.getElementById(COMPOSER_INPUT_ID)?.focus()
  })
}

function seedComposer(prompt) {
  window.requestAnimationFrame(() => {
    const composerElement = document.getElementById(COMPOSER_INPUT_ID)
    if (!composerElement) {
      return
    }

    const valueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value',
    )?.set

    valueSetter?.call(composerElement, prompt)
    composerElement.dispatchEvent(new Event('input', { bubbles: true }))
    composerElement.focus()
    composerElement.setSelectionRange(prompt.length, prompt.length)
  })
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function createMessageEntry(role, text) {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
    createdAt: Date.now(),
  }
}

function createEmptyConversationSession() {
  return {
    id: null,
    title: 'Percakapan baru',
    status: 'draft',
    entries: [],
    composerText: '',
    createdAt: null,
    updatedAt: null,
    lastSavedAt: null,
    firstPrompt: '',
    preview: '',
  }
}

function createPreviewText(entries, composerText) {
  const lastEntry = [...entries].reverse().find((entry) => entry.text?.trim())
  const previewSource = lastEntry?.text?.trim() || composerText.trim()

  if (!previewSource) {
    return ''
  }

  return previewSource.length > 88 ? `${previewSource.slice(0, 85)}...` : previewSource
}

function buildConversationTitleFromText(text) {
  const normalizedText = text.toLowerCase()

  if (normalizedText.includes('penjualan')) {
    return 'Strategi menaikkan penjualan'
  }

  if (normalizedText.includes('stok') || normalizedText.includes('restock')) {
    return 'Cek stok dan prioritas restock'
  }

  if (normalizedText.includes('promosi') || normalizedText.includes('marketing')) {
    return 'Strategi promosi usaha'
  }

  if (normalizedText.includes('bisnis') || normalizedText.includes('usaha')) {
    return 'Insight perkembangan bisnis'
  }

  if (normalizedText.includes('jual') || normalizedText.includes('transaksi')) {
    return 'Draft transaksi percakapan'
  }

  const trimmedText = text.trim()
  if (!trimmedText) {
    return 'Percakapan baru'
  }

  return trimmedText.length > 52 ? `${trimmedText.slice(0, 49)}...` : trimmedText
}

function buildConversationTitle(session) {
  const firstUserEntry = session.entries.find((entry) => entry.role === 'user' && entry.text?.trim())
  const titleSource =
    firstUserEntry?.text ??
    session.firstPrompt ??
    session.composerText ??
    'Percakapan baru'

  return buildConversationTitleFromText(titleSource)
}

function normalizeConversationSession(session) {
  const updatedAt = session.updatedAt ?? Date.now()
  const normalizedSession = {
    ...createEmptyConversationSession(),
    ...session,
    updatedAt,
    entries: Array.isArray(session.entries) ? session.entries : [],
    composerText: session.composerText ?? '',
  }

  return {
    ...normalizedSession,
    title: buildConversationTitle(normalizedSession),
    preview: createPreviewText(normalizedSession.entries, normalizedSession.composerText),
  }
}

function getInitialConversationSession() {
  const latestSession = loadChatSessions()[0]
  return latestSession
    ? normalizeConversationSession(latestSession)
    : createEmptyConversationSession()
}

function convertConversationEntriesToInitialMessages(entries = []) {
  return entries
    .filter((entry) => entry.text?.trim())
    .map((entry) => ({
      id: entry.id,
      role: entry.role,
      content: [{ type: 'text', text: entry.text }],
    }))
}

function hasConversationContent(session) {
  return session.entries.length > 0 || Boolean(session.composerText.trim())
}

function shouldSuggestSaving(session) {
  if (session.status !== 'draft') {
    return false
  }

  if (session.entries.length >= 3) {
    return true
  }

  const combinedText = [
    session.firstPrompt,
    session.composerText,
    ...session.entries.map((entry) => entry.text),
  ]
    .join(' ')
    .toLowerCase()

  return BUSINESS_SAVE_KEYWORDS.some((keyword) => combinedText.includes(keyword))
}

export function useChatAssistantFlow() {
  const initialConversationSession = useMemo(() => getInitialConversationSession(), [])
  const initialMessages = useMemo(
    () => convertConversationEntriesToInitialMessages(initialConversationSession.entries),
    [initialConversationSession.entries],
  )

  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [activeContext, setActiveContext] = useState(null)
  const [pendingDraft, setPendingDraft] = useState(null)
  const [savedDraftCount, setSavedDraftCount] = useState(0)
  const [activeMode, setActiveMode] = useState('chat')
  const [isResponding, setIsResponding] = useState(false)
  const [composerText, setComposerText] = useState(initialConversationSession.composerText ?? '')
  const [conversationSession, setConversationSession] = useState(initialConversationSession)
  const [saveFeedback, setSaveFeedback] = useState('')
  const [saveSuggestionDismissed, setSaveSuggestionDismissed] = useState(false)
  const draftSectionRef = useRef(null)
  const pendingDraftRef = useRef(null)
  const conversationSessionRef = useRef(conversationSession)
  const hydratedComposerRef = useRef(false)
  const saveFeedbackTimeoutRef = useRef(null)
  const attachmentAdapter = useMemo(() => createLocalAttachmentAdapter(), [])

  pendingDraftRef.current = pendingDraft
  conversationSessionRef.current = conversationSession

  useEffect(() => {
    if (!composerText || hydratedComposerRef.current) {
      return
    }

    hydratedComposerRef.current = true
    seedComposer(composerText)
  }, [composerText])

  useEffect(() => {
    return () => {
      window.clearTimeout(saveFeedbackTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (conversationSession.status !== 'draft' || !hasConversationContent(conversationSession)) {
      return undefined
    }

    const beforeUnloadHandler = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', beforeUnloadHandler)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [conversationSession])

  function showSaveFeedback(message) {
    setSaveFeedback(message)
    window.clearTimeout(saveFeedbackTimeoutRef.current)
    saveFeedbackTimeoutRef.current = window.setTimeout(() => {
      setSaveFeedback('')
    }, SAVE_FEEDBACK_DURATION_MS)
  }

  function persistConversationSession(updater, options = {}) {
    const currentSession = conversationSessionRef.current
    const nextSessionDraft = typeof updater === 'function'
      ? updater(currentSession)
      : { ...currentSession, ...updater }

    const nextSession = normalizeConversationSession({
      ...nextSessionDraft,
      updatedAt: Date.now(),
      lastSavedAt: options.touchLastSavedAt === false
        ? nextSessionDraft.lastSavedAt ?? currentSession.lastSavedAt
        : options.forceLastSavedAt ?? nextSessionDraft.lastSavedAt,
    })

    conversationSessionRef.current = nextSession
    setConversationSession(nextSession)
    upsertChatSessionRecord(nextSession)

    if (options.feedback) {
      showSaveFeedback(options.feedback)
    }

    return nextSession
  }

  function ensureConversationSession(seedText = '') {
    if (conversationSessionRef.current.id) {
      return conversationSessionRef.current.id
    }

    const nextSession = normalizeConversationSession({
      ...createEmptyConversationSession(),
      id: generateChatSessionId(),
      status: 'draft',
      composerText: seedText,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      firstPrompt: seedText.trim(),
    })

    conversationSessionRef.current = nextSession
    setConversationSession(nextSession)
    upsertChatSessionRecord(nextSession)
    showSaveFeedback('Tersimpan sebagai draft')
    return nextSession.id
  }

  function appendConversationEntry(role, text) {
    if (!text.trim()) {
      return conversationSessionRef.current
    }

    ensureConversationSession(text)
    setSaveSuggestionDismissed(false)

    return persistConversationSession(
      (currentSession) => ({
        ...currentSession,
        status: 'draft',
        composerText: role === 'user' ? '' : currentSession.composerText,
        firstPrompt: currentSession.firstPrompt || (role === 'user' ? text.trim() : currentSession.firstPrompt),
        entries: [...currentSession.entries, createMessageEntry(role, text.trim())],
      }),
      {
        feedback: 'Tersimpan sebagai draft',
        touchLastSavedAt: false,
      },
    )
  }

  function saveConversationNow() {
    if (!hasConversationContent(conversationSessionRef.current)) {
      return
    }

    persistConversationSession(
      (currentSession) => ({
        ...currentSession,
        status: 'saved',
        lastSavedAt: Date.now(),
      }),
      {
        feedback: 'Percakapan tersimpan',
        forceLastSavedAt: Date.now(),
      },
    )
  }

  function setModeContext(mode, nextContext) {
    const nextMode = conversationModes[mode] ?? conversationModes.chat
    setActiveMode(mode)
    setActiveContext(nextContext ?? nextMode.context)
  }

  function applyFlowResult(result) {
    const nextMode = result.mode ?? 'chat'
    setActiveMode(nextMode)
    setActiveContext(result.context ?? conversationModes[nextMode]?.context ?? null)

    if (result.clearDraft) {
      setPendingDraft(null)
      focusComposer()
      return
    }

    if (result.replaceDraft) {
      setPendingDraft(result.draft ?? null)
      scrollToElement(draftSectionRef.current)
      return
    }

    if (result.draft) {
      setPendingDraft(result.draft)
      scrollToElement(draftSectionRef.current)
    }
  }

  async function resolveAssistantResponse({ userText = '', result, afterResolve }) {
    setIsResponding(true)

    try {
      await wait(getAssistantResponseDelayMs({ userText, result }))
      applyFlowResult(result)
      afterResolve?.()
      appendConversationEntry('assistant', result.assistantText)
    } finally {
      setIsResponding(false)
    }
  }

  const runtime = useLocalRuntime(
    {
      async run({ messages }) {
        const lastMessage = messages[messages.length - 1]
        const userText = getLastUserText(lastMessage)
        const attachmentName = getLastUserAttachmentName(lastMessage)
        const summarizedUserText = userText || (attachmentName ? `Upload nota: ${attachmentName}` : 'Pesan baru')
        const result = createChatFlowResult({
          userText,
          attachmentName,
          pendingDraft: pendingDraftRef.current,
        })

        appendConversationEntry('user', summarizedUserText)
        setComposerText('')
        await resolveAssistantResponse({ userText: summarizedUserText, result })

        return {
          content: [
            {
              type: 'text',
              text: result.assistantText,
            },
          ],
        }
      },
    },
    {
      initialMessages,
      adapters: {
        attachments: attachmentAdapter,
      },
    },
  )

  function prepareChatMode() {
    setModeContext('chat')
    focusComposer()
  }

  function prepareBusinessMode() {
    setModeContext('chat', {
      modeLabel: 'Analisa Bisnis',
      description:
        'Tanyakan kondisi penjualan, stok, promosi, atau strategi bisnis. Saya akan menjawab dengan insight dan pertanyaan lanjutan yang relevan.',
    })
    seedComposer('Tolong analisa bisnis saya hari ini dan kasih insight yang paling penting dulu.')
  }

  function prepareDraftMode() {
    setModeContext('chat', {
      modeLabel: 'Draft Transaksi',
      description:
        'Ceritakan transaksi dengan bahasa natural. Saya akan mengubahnya jadi draft yang bisa Anda cek sebelum disimpan.',
    })
    seedComposer('Saya baru jual 2 kopi susu dan 1 latte.')
  }

  function prepareUploadMode() {
    setModeContext('upload')
    focusComposer()
  }

  function handleComposerInputChange(event) {
    const nextValue = event?.target?.value ?? ''
    const trimmedValue = nextValue.trim()
    const hasExistingSession = Boolean(conversationSessionRef.current.id)

    setComposerText(nextValue)

    if (!trimmedValue && !hasExistingSession) {
      return
    }

    if (trimmedValue && !hasExistingSession) {
      ensureConversationSession(nextValue)
      return
    }

    persistConversationSession(
      (currentSession) => ({
        ...currentSession,
        composerText: nextValue,
        status: 'draft',
        firstPrompt: currentSession.firstPrompt || trimmedValue,
      }),
      {
        touchLastSavedAt: false,
      },
    )
  }

  function handleUseStarterPrompt(prompt) {
    setModeContext('chat')
    seedComposer(prompt)
  }

  function handleOpenScanner() {
    setModeContext('scan')
    setIsScannerOpen(true)
  }

  function handleCloseScanner() {
    setIsScannerOpen(false)
  }

  async function handleSelectScannerProduct(product) {
    const result = createScannerFlowResult(product)
    appendConversationEntry('user', `Scan barcode ${product.barcode} untuk ${product.name}`)

    await resolveAssistantResponse({
      userText: `scan ${product.name}`,
      result,
      afterResolve: () => {
        setIsScannerOpen(false)
      },
    })
  }

  function handleSaveDraft() {
    setSavedDraftCount((currentCount) => currentCount + 1)
    setPendingDraft(null)
    setActiveMode('chat')
    setActiveContext({
      modeLabel: 'Draft Tersimpan',
      description:
        'Draft terakhir berhasil disimpan. Anda bisa lanjut mengetik instruksi baru, scan barcode, atau upload nota lagi.',
    })
    focusComposer()
  }

  function handleDiscardDraft() {
    setPendingDraft(null)
    setActiveMode('chat')
    setActiveContext({
      modeLabel: 'Draft Dibatalkan',
      description:
        'Draft terakhir dibatalkan. Anda bisa membuat draft baru lewat chat, scan barcode, atau upload nota kapan saja.',
    })
    focusComposer()
  }

  function handleOpenDraft() {
    if (!pendingDraft) {
      setActiveContext({
        modeLabel: 'Draft Konfirmasi',
        description:
          'Belum ada draft aktif. Buat draft lebih dulu lewat chat, scan barcode, atau upload nota.',
      })
      return
    }

    scrollToElement(draftSectionRef.current)
  }

  function dismissSaveSuggestion() {
    setSaveSuggestionDismissed(true)
  }

  const hasConversationDraft = hasConversationContent(conversationSession)
  const showSaveSuggestion = shouldSuggestSaving(conversationSession) && !saveSuggestionDismissed

  return {
    runtime,
    isScannerOpen,
    activeContext,
    pendingDraft,
    savedDraftCount,
    activeMode,
    isResponding,
    activeModeMeta: conversationModes[activeMode] ?? conversationModes.chat,
    composerInputId: COMPOSER_INPUT_ID,
    draftSectionRef,
    conversationSession,
    conversationStatus: conversationSession.status,
    conversationTitle: conversationSession.title,
    conversationPreview: conversationSession.preview,
    conversationUpdatedAt: conversationSession.updatedAt,
    conversationHasContent: hasConversationDraft,
    saveFeedback,
    showSaveSuggestion,
    prepareChatMode,
    prepareBusinessMode,
    prepareDraftMode,
    prepareUploadMode,
    handleComposerInputChange,
    handleUseStarterPrompt,
    handleOpenScanner,
    handleCloseScanner,
    handleSelectScannerProduct,
    handleSaveConversation: saveConversationNow,
    handleDismissSaveSuggestion: dismissSaveSuggestion,
    handleSaveDraft,
    handleDiscardDraft,
    handleOpenDraft,
  }
}


