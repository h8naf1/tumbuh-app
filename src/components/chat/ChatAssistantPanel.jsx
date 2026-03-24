import { useMemo } from 'react'
import {
  AssistantRuntimeProvider,
  AttachmentPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from '@assistant-ui/react'
import {
  FileText,
  ImageIcon,
  Paperclip,
  SendHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '../ui/Button.jsx'

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
        Anda bisa bertanya seputar usaha, meminta ringkasan stok, atau mulai upload
        nota belanja untuk dijadikan draft pencatatan.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        <ThreadPrimitive.Suggestion
          prompt="Tolong bantu ringkas stok yang perlu saya cek hari ini."
          className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-200 transition hover:border-blue-500/30 hover:bg-slate-900/80"
        />
        <ThreadPrimitive.Suggestion
          prompt="Apa langkah sederhana untuk mencatat pembelian stok mingguan?"
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

function ChatThread() {
  return (
    <ThreadPrimitive.Root className="flex min-h-[38rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(2,6,23,0.98)_100%)] shadow-[0_32px_70px_-38px_rgba(2,6,23,0.95)] lg:h-[calc(100vh-15.5rem)] lg:min-h-[42rem]">
      <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Ruang Percakapan</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Mulai chat seperti biasa atau upload nota untuk menyiapkan draft
              pencatatan stok.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
              <ImageIcon className="h-3.5 w-3.5" />
              Gambar
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5">
              <FileText className="h-3.5 w-3.5" />
              PDF / Dokumen
            </span>
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
              placeholder="Tulis pertanyaan Anda atau upload nota belanja stok di sini..."
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
                      Upload File
                    </Button>
                  </ComposerPrimitive.AddAttachment>

                  <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] text-slate-400">
                    Gambar / PDF / Dokumen
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Setelah file diupload, Anda tetap bisa mengecek dan mengonfirmasi
                  hasilnya secara manual.
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
  const attachmentAdapter = useMemo(() => createLocalAttachmentAdapter(), [])

  const runtime = useLocalRuntime({
    async run({ messages }) {
      const lastMessage = messages[messages.length - 1]
      const userText = getLastUserText(lastMessage)
      const attachmentCount = getLastUserAttachmentCount(lastMessage)

      const introText =
        attachmentCount > 0
          ? `Saya menerima ${attachmentCount} file dari Anda.`
          : 'Pesan Anda sudah saya terima.'

      const detailText = userText
        ? `Isi pesan Anda: "${userText}".`
        : 'Belum ada isi pesan teks, tetapi lampiran Anda sudah masuk.'

      return {
        content: [
          {
            type: 'text',
            text: `${introText} ${detailText} Untuk tahap pertama ini, chat masih memakai respons lokal. Tahap berikutnya kita bisa lanjut membaca nota, mengekstrak item stok, lalu menampilkannya sebagai draft data usaha.`,
          },
        ],
      }
    },
    adapters: {
      attachments: attachmentAdapter,
    },
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ChatThread />
    </AssistantRuntimeProvider>
  )
}

export default ChatAssistantPanel
