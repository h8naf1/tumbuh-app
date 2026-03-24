import { useMemo, useRef, useState } from 'react'
import {
  AssistantRuntimeProvider,
  AttachmentPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from '@assistant-ui/react'
import {
  CheckCheck,
  FileText,
  Paperclip,
  QrCode,
  ScanLine,
  SendHorizontal,
  Sparkles,
  WalletCards,
  X,
} from 'lucide-react'
import { Button } from '../ui/Button.jsx'

const scannerProducts = [
  {
    barcode: '8991001001',
    name: 'Kopi Susu Gula Aren',
    price: 18000,
    stock: 12,
  },
  {
    barcode: '8991001002',
    name: 'Brownies Cokelat',
    price: 15000,
    stock: 8,
  },
  {
    barcode: '8991001003',
    name: 'Americano Ice',
    price: 20000,
    stock: 15,
  },
]

const quickActions = [
  {
    id: 'chat',
    title: 'Tanya AI',
    description: 'Tulis instruksi seperti sedang memberi arahan ke asisten usaha.',
    icon: Sparkles,
    accentClassName: 'bg-blue-500/10 text-blue-400',
  },
  {
    id: 'scan',
    title: 'Scan Barcode',
    description: 'Scan produk yang baru terjual lalu lanjutkan konfirmasi lewat chat.',
    icon: QrCode,
    accentClassName: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    id: 'upload',
    title: 'Upload Nota',
    description: 'Upload gambar atau PDF nota untuk dibaca dan disusun jadi draft.',
    icon: FileText,
    accentClassName: 'bg-amber-500/10 text-amber-400',
  },
]

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}

function getLastUserText(message) {
  if (!message?.content) {
    return ''
  }

  const textPart = message.content.find((part) => part.type === 'text')
  return textPart?.text?.trim() ?? ''
}

function getLastUserAttachmentCount(message) {
  if (!message?.attachments) {
    return 0
  }

  return message.attachments.length
}

function createLocalAttachmentAdapter() {
  const objectUrls = new Map()

  return {
    accept: 'image/*,application/pdf,.txt,.csv,.doc,.docx',
    async add(file) {
      const objectUrl = URL.createObjectURL(file)
      const attachmentId = `${file.name}-${crypto.randomUUID()}`

      objectUrls.set(attachmentId, objectUrl)

      const type = file.type.startsWith('image/')
        ? 'image'
        : file.type === 'application/pdf'
          ? 'document'
          : 'file'

      return {
        id: attachmentId,
        type,
        name: file.name,
        content: [{ type, [type === 'image' ? 'image' : 'url']: objectUrl }],
      }
    },
    async remove(attachment) {
      const objectUrl = objectUrls.get(attachment.id)

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
        objectUrls.delete(attachment.id)
      }
    },
  }
}

function parseSalesInstruction(text) {
  const normalizedText = text.toLowerCase()

  if (
    !normalizedText.includes('jual') &&
    !normalizedText.includes('terjual') &&
    !normalizedText.includes('transaksi')
  ) {
    return null
  }

  const catalog = [
    { keyword: 'kopi susu', name: 'Kopi Susu Gula Aren', price: 18000 },
    { keyword: 'brownies', name: 'Brownies Cokelat', price: 15000 },
    { keyword: 'americano', name: 'Americano Ice', price: 20000 },
  ]

  const items = catalog
    .map((product) => {
      const match = normalizedText.match(new RegExp(`(\\d+)\\s+${product.keyword}`))

      if (!match) {
        return null
      }

      const quantity = Number(match[1])

      return {
        name: product.name,
        quantity,
        price: product.price,
        total: quantity * product.price,
      }
    })
    .filter(Boolean)

  if (items.length === 0) {
    return null
  }

  const total = items.reduce((sum, item) => sum + item.total, 0)

  return {
    source: 'chat',
    title: 'Draft transaksi dari chat',
    items,
    total,
    note: 'AI menyusun draft dari instruksi yang Anda ketik.',
  }
}

function buildDraftFromScanner(product) {
  return {
    source: 'scan',
    title: 'Draft transaksi dari hasil scan',
    items: [
      {
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      },
    ],
    total: product.price,
    note: `Barcode ${product.barcode} berhasil dibaca. Anda masih bisa ubah jumlah saat tahap konfirmasi.`,
  }
}

function ComposerAttachment() {
  return (
    <AttachmentPrimitive.Root className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
        <AttachmentPrimitive.Thumbnail />
      </div>

      <div className="min-w-0 flex-1">
        <AttachmentPrimitive.Name className="truncate text-sm font-medium text-slate-100" />
      </div>

      <AttachmentPrimitive.Remove asChild>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Hapus lampiran"
        >
          <X className="h-4 w-4" />
        </button>
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  )
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[85%] space-y-2 rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-white shadow-[0_18px_36px_-24px_rgba(37,99,235,0.95)]">
        <MessagePrimitive.Attachments />
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-[0_18px_36px_-28px_rgba(2,6,23,0.9)]">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Asisten TUMBUH</span>
        </div>
        <div className="space-y-2 leading-7 text-slate-200">
          <MessagePrimitive.Attachments />
          <MessagePrimitive.Parts />
        </div>
      </div>
    </MessagePrimitive.Root>
  )
}

function EmptyChatState() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
        <Sparkles className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">Asisten Chat TUMBUH</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
        Anda bebas memilih cara kerja: ngobrol langsung seperti memberi instruksi,
        scan barcode untuk transaksi cepat, atau upload nota untuk dibaca.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        <ThreadPrimitive.Suggestion
          prompt="Saya baru jual 2 kopi susu dan 1 brownies."
          className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-blue-500/30 hover:bg-slate-900/80"
        />
        <ThreadPrimitive.Suggestion
          prompt="Produk mana yang stoknya perlu saya cek hari ini?"
          className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-blue-500/30 hover:bg-slate-900/80"
        />
        <ThreadPrimitive.Suggestion
          prompt="Saya ingin upload nota belanja bahan baku."
          className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-blue-500/30 hover:bg-slate-900/80"
        />
      </div>
    </div>
  )
}

function QuickActionSection({ onOpenScanner }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {quickActions.map((action) => {
        const Icon = action.icon
        const isScannerAction = action.id === 'scan'

        return (
          <button
            key={action.id}
            type="button"
            onClick={isScannerAction ? onOpenScanner : undefined}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left shadow-[0_18px_40px_-28px_rgba(2,6,23,0.8)] transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/90"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.accentClassName}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">{action.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {action.description}
            </p>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 transition group-hover:text-blue-400">
              {isScannerAction ? 'Buka scanner' : 'Gunakan di chat'}
            </p>
          </button>
        )
      })}
    </section>
  )
}

function ContextBar({ context }) {
  if (!context) {
    return null
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          Mode aktif: {context.modeLabel}
        </span>
        {context.barcode ? (
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300">
            Barcode: {context.barcode}
          </span>
        ) : null}
        {context.fileName ? (
          <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300">
            File: {context.fileName}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400">{context.description}</p>
    </section>
  )
}

function DraftConfirmationCard({ draft, onSave, onDiscard }) {
  if (!draft) {
    return null
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.82)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Draft Konfirmasi
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">{draft.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{draft.note}</p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          Total {formatRupiah(draft.total)}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {draft.items.map((item) => (
          <div
            key={`${draft.source}-${item.name}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.quantity} item x {formatRupiah(item.price)}
              </p>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              {formatRupiah(item.total)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
        >
          <CheckCheck className="h-4 w-4" />
          Simpan Draft
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onDiscard}
          className="rounded-xl border-slate-700 bg-slate-950/80 text-slate-200 hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
          Batalkan
        </Button>
      </div>
    </section>
  )
}

function ScannerModal({ isOpen, onClose, onSelectProduct }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-slate-800 bg-slate-900 shadow-[0_30px_80px_-34px_rgba(2,6,23,0.9)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              Scan Barcode
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Simulasi scanner produk
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Untuk tahap UI ini, pilih salah satu produk hasil scan agar alur chat
              dan draft transaksi bisa langsung terlihat.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:text-white"
            aria-label="Tutup scanner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-dashed border-blue-500/25 bg-slate-950/60 p-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <ScanLine className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-white">Scanner siap digunakan</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Nanti di tahap implementasi fitur penuh, area ini bisa diganti kamera
              scanner barcode.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {scannerProducts.map((product) => (
              <button
                key={product.barcode}
                type="button"
                onClick={() => onSelectProduct(product)}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-left transition hover:border-blue-500/30 hover:bg-slate-950"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Barcode {product.barcode}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-200">
                      {formatRupiah(product.price)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Stok {product.stock}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatThread({ onOpenScanner, onOpenDraft, hasDraft }) {
  return (
    <ThreadPrimitive.Root className="flex min-h-[38rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(2,6,23,0.98)_100%)] shadow-[0_32px_70px_-38px_rgba(2,6,23,0.95)] lg:h-[calc(100vh-20rem)] lg:min-h-[42rem]">
      <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Ruang Percakapan</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Gunakan chat seperti memberi arahan ke asisten, atau mulai dari scan
              barcode dan upload nota.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={onOpenScanner}
              className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5 transition hover:border-blue-500/30 hover:text-blue-300"
            >
              <QrCode className="h-3.5 w-3.5" />
              Scan cepat
            </button>
            <button
              type="button"
              onClick={onOpenDraft}
              disabled={!hasDraft}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 transition ${
                hasDraft
                  ? 'border-slate-800 bg-slate-900/70 hover:border-blue-500/30 hover:text-blue-300'
                  : 'cursor-not-allowed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              <WalletCards className="h-3.5 w-3.5" />
              Draft konfirmasi
            </button>
          </div>
        </div>
      </div>

      <ThreadPrimitive.Viewport className="flex-1 space-y-5 overflow-y-auto bg-slate-950/35 px-4 py-5 sm:px-6">
        <ThreadPrimitive.Empty>
          <EmptyChatState />
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      <div className="border-t border-slate-800 bg-slate-950/80 p-4 sm:p-5">
        <ComposerPrimitive.Root className="space-y-3">
          <ComposerPrimitive.Attachments
            components={{
              Attachment: ComposerAttachment,
            }}
            className="grid gap-2"
          />

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 sm:p-4">
            <ComposerPrimitive.Input
              rows={3}
              placeholder="Tulis instruksi seperti seorang bos ke asisten, misalnya: saya baru jual 2 kopi susu dan 1 brownies..."
              className="min-h-24 w-full resize-none bg-transparent text-sm leading-7 text-slate-100 outline-none placeholder:text-slate-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <ComposerPrimitive.AddAttachment asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-slate-700 bg-slate-950/80 text-slate-200 hover:bg-slate-800"
                    >
                      <Paperclip className="h-4 w-4" />
                      Upload Nota
                    </Button>
                  </ComposerPrimitive.AddAttachment>

                  <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-400">
                    Gambar / PDF / Dokumen
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Setelah file diupload atau instruksi diproses, Anda tetap bisa
                  mengecek hasil sebelum menyimpan.
                </p>
              </div>

              <ComposerPrimitive.Send asChild>
                <Button
                  type="button"
                  size="lg"
                  className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
                >
                  <SendHorizontal className="h-4 w-4" />
                  Kirim
                </Button>
              </ComposerPrimitive.Send>
            </div>
          </div>
        </ComposerPrimitive.Root>
      </div>
    </ThreadPrimitive.Root>
  )
}

function ChatAssistantPanel() {
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [activeContext, setActiveContext] = useState(null)
  const [pendingDraft, setPendingDraft] = useState(null)
  const [savedDraftCount, setSavedDraftCount] = useState(0)
  const draftSectionRef = useRef(null)
  const attachmentAdapter = useMemo(() => createLocalAttachmentAdapter(), [])

  const runtime = useLocalRuntime({
    async run({ messages }) {
      const lastMessage = messages[messages.length - 1]
      const userText = getLastUserText(lastMessage)
      const attachmentCount = getLastUserAttachmentCount(lastMessage)
      const chatDraft = parseSalesInstruction(userText)

      if (chatDraft) {
        setPendingDraft(chatDraft)
        setActiveContext({
          modeLabel: 'Chat Generatif',
          description:
            'AI membaca instruksi penjualan dari percakapan dan menyiapkan draft transaksi untuk Anda cek.',
        })

        return {
          content: [
            {
              type: 'text',
              text: `Saya sudah membaca instruksi Anda dan menyiapkan draft transaksi. Silakan cek bagian draft konfirmasi di bawah, lalu simpan jika sudah sesuai.`,
            },
          ],
        }
      }

      if (attachmentCount > 0) {
        const attachmentName = lastMessage.attachments?.[0]?.name ?? 'dokumen'

        setPendingDraft({
          source: 'upload',
          title: 'Draft hasil upload nota',
          items: [
            {
              name: 'Bahan baku dari nota',
              quantity: 1,
              price: 125000,
              total: 125000,
            },
          ],
          total: 125000,
          note: `File ${attachmentName} berhasil diterima. Tahap berikutnya nanti bisa dilanjutkan ke OCR dan parsing isi nota.`,
        })
        setActiveContext({
          modeLabel: 'Upload Nota',
          fileName: attachmentName,
          description:
            'File upload sudah masuk ke alur chat. Nanti hasil bacaan nota bisa muncul sebagai draft stok atau draft transaksi.',
        })

        return {
          content: [
            {
              type: 'text',
              text: `Saya menerima file ${attachmentName}. Untuk tahap UI ini, saya sudah siapkan draft awal agar alurnya terlihat. Tahap berikutnya kita bisa sambungkan ke OCR nota.`,
            },
          ],
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: 'Pesan Anda sudah saya terima. Anda bisa lanjut bertanya seperti biasa, scan barcode, atau upload nota untuk membentuk draft transaksi maupun stok.',
          },
        ],
      }
    },
    adapters: {
      attachments: attachmentAdapter,
    },
  })

  function handleOpenScanner() {
    setIsScannerOpen(true)
  }

  function handleCloseScanner() {
    setIsScannerOpen(false)
  }

  function handleSelectScannerProduct(product) {
    setActiveContext({
      modeLabel: 'Scan Barcode',
      barcode: product.barcode,
      description: `Produk ${product.name} berhasil ditemukan dari hasil scan. AI bisa lanjut membantu konfirmasi jumlah dan penyusunan transaksi.`,
    })
    setPendingDraft(buildDraftFromScanner(product))
    setIsScannerOpen(false)
  }

  function handleSaveDraft() {
    setSavedDraftCount((currentCount) => currentCount + 1)
    setPendingDraft(null)
  }

  function handleDiscardDraft() {
    setPendingDraft(null)
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

    draftSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="app-page-stack">
        <QuickActionSection onOpenScanner={handleOpenScanner} />

        <ContextBar context={activeContext} />

        {savedDraftCount > 0 ? (
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-300">
            {savedDraftCount} draft berhasil disimpan dalam sesi ini.
          </section>
        ) : null}

        <div ref={draftSectionRef}>
          <DraftConfirmationCard
            draft={pendingDraft}
            onSave={handleSaveDraft}
            onDiscard={handleDiscardDraft}
          />
        </div>

        <ChatThread
          onOpenScanner={handleOpenScanner}
          onOpenDraft={handleOpenDraft}
          hasDraft={Boolean(pendingDraft)}
        />
      </div>

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={handleCloseScanner}
        onSelectProduct={handleSelectScannerProduct}
      />
    </AssistantRuntimeProvider>
  )
}

export default ChatAssistantPanel
