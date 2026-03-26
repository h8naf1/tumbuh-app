import {
  AssistantRuntimeProvider,
  AttachmentPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import {
  CheckCheck,
  CheckCircle2,
  CircleDot,
  FileText,
  Paperclip,
  Plus,
  QrCode,
  Save,
  ScanLine,
  SendHorizontal,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { useChatAssistantFlow } from "../../hooks/useChatAssistantFlow.js";

const scannerProducts = [
  {
    barcode: "8991001001",
    name: "Kopi Susu Gula Aren",
    price: 24000,
    stock: 12,
  },
  {
    barcode: "8991001002",
    name: "Latte",
    price: 22000,
    stock: 14,
  },
  {
    barcode: "8991001003",
    name: "Cappuccino",
    price: 23000,
    stock: 10,
  },
];


const quickActions = [
  {
    id: "draft",
    title: "Buat Draft Transaksi",
    description:
      "Mulai dari input transaksi natural lalu biarkan assistant menyusunnya jadi draft.",
    icon: WalletCards,
    accentClassName: "bg-blue-500/10 text-blue-500",
    actionLabel: "Isi contoh transaksi",
  },
  {
    id: "business",
    title: "Analisa Bisnis",
    description:
      "Tanya soal penjualan, stok, promosi, atau strategi agar percakapannya lebih terarah.",
    icon: Sparkles,
    accentClassName: "bg-violet-500/10 text-violet-400",
    actionLabel: "Mulai dari insight",
  },
  {
    id: "scan",
    title: "Scan Produk",
    description:
      "Pilih hasil scan produk lalu lanjutkan koreksi draft di percakapan yang sama.",
    icon: QrCode,
    accentClassName: "bg-emerald-500/10 text-emerald-400",
    actionLabel: "Buka scanner",
  },
  {
    id: "upload",
    title: "Upload Nota",
    description:
      "Masukkan nota lalu review draft awal tanpa perlu pindah ke flow yang berbeda.",
    icon: FileText,
    accentClassName: "bg-amber-500/10 text-amber-400",
    actionLabel: "Siapkan upload",
  },
];

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function formatConversationTime(timestamp) {
  if (!timestamp) {
    return "baru saja";
  }

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function ConversationStatusPill({ status }) {
  const isSaved = status === "saved";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        isSaved
          ? "bg-emerald-500/10 text-emerald-600"
          : "bg-amber-500/10 text-amber-600"
      }`}
    >
      {isSaved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleDot className="h-3.5 w-3.5" />}
      {isSaved ? "Tersimpan" : "Draft"}
    </span>
  );
}

function ConversationSessionSummary({
  conversationStatus,
  conversationTitle,
  conversationPreview,
  conversationUpdatedAt,
  saveFeedback,
}) {
  return (
    <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Status Percakapan
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ConversationStatusPill status={conversationStatus} />
            <h2 className="text-lg font-semibold text-[var(--app-text)]">{conversationTitle}</h2>
            <span className="text-xs text-[var(--app-text-muted)]">
              Update {formatConversationTime(conversationUpdatedAt)}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--app-text-muted)]">
            {conversationPreview ||
              "Percakapan baru akan otomatis disimpan sebagai draft begitu Anda mulai mengetik atau mengirim pesan."}
          </p>
        </div>

        {saveFeedback ? (
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
            {saveFeedback}
          </span>
        ) : null}
      </div>
    </section>
  );
}

function ComposerAttachment() {
  return (
    <AttachmentPrimitive.Root className="flex items-center gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]/80 px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--app-surface)] text-[var(--app-text-soft)]">
        <AttachmentPrimitive.unstable_Thumb />
      </div>

      <div className="min-w-0 flex-1">
        <AttachmentPrimitive.Name className="truncate text-sm font-medium text-[var(--app-text)]" />
      </div>

      <AttachmentPrimitive.Remove asChild>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--app-text-muted)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
          aria-label="Hapus lampiran"
        >
          <X className="h-4 w-4" />
        </button>
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[85%] space-y-2 rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-white shadow-[0_18px_36px_-24px_rgba(37,99,235,0.95)]">
        <MessagePrimitive.Attachments />
        <div className="user-message-body"><MessagePrimitive.Parts /></div>
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-4 py-3 text-sm text-[var(--app-text)] shadow-[0_18px_36px_-28px_rgba(2,6,23,0.9)]">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Asisten TUMBUH</span>
        </div>
        <div className="assistant-message-body space-y-2 leading-7 text-[var(--app-text-soft)]">
          <MessagePrimitive.Attachments />
          <MessagePrimitive.Parts />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] rounded-2xl rounded-bl-md border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-4 py-3 shadow-[0_18px_36px_-28px_rgba(2,6,23,0.9)]">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Asisten TUMBUH sedang mengetik</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--app-text-soft)]">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.2s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.1s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400" />
        </div>
      </div>
    </div>
  );
}

function EmptyChatState({ onUseStarterPrompt }) {
  const prompts = [
    'Saya baru jual 2 kopi susu dan 1 cappuccino.',
    'Produk mana yang stoknya perlu saya cek hari ini?',
    'Saya ingin upload nota belanja bahan baku.',
    'Tolong ringkas penjualan hari ini dan kasih insight berikutnya.',
  ]

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
        <Sparkles className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-[var(--app-text)]">
        Asisten Chat TUMBUH
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--app-text-muted)] sm:text-base">
        Assistant akan menyesuaikan alurnya berdasarkan intent Anda. Kalau Anda
        menyapa, dia akan membuka percakapan. Kalau Anda tanya bisnis, dia akan
        kasih insight. Kalau Anda input transaksi, dia akan buat draft.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onUseStarterPrompt?.(prompt)}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-4 py-4 text-left text-sm text-[var(--app-text)] transition hover:border-blue-500/30 hover:bg-[var(--app-surface-strong)]/80 hover:text-blue-500"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuickActionSection({
  onPrepareDraft,
  onPrepareBusiness,
  onOpenScanner,
  onPrepareUpload,
}) {
  const actionHandlers = {
    draft: onPrepareDraft,
    business: onPrepareBusiness,
    scan: onOpenScanner,
    upload: onPrepareUpload,
  };

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {quickActions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.id}
            type="button"
            onClick={actionHandlers[action.id]}
            className="group rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 text-left shadow-[0_18px_40px_-28px_rgba(2,6,23,0.8)] transition hover:-translate-y-0.5 hover:border-[var(--app-border)] hover:bg-[var(--app-surface-strong)]/90"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.accentClassName}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-[var(--app-text)]">
              {action.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
              {action.description}
            </p>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--app-text-muted)] transition group-hover:text-blue-500">
              {action.actionLabel}
            </p>
          </button>
        );
      })}
    </section>
  );
}

function ContextBar({ context }) {
  if (!context) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
          Mode aktif: {context.modeLabel}
        </span>
        {context.barcode ? (
          <span className="rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-1 text-xs text-[var(--app-text-soft)]">
            Barcode: {context.barcode}
          </span>
        ) : null}
        {context.fileName ? (
          <span className="rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-1 text-xs text-[var(--app-text-soft)]">
            File: {context.fileName}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--app-text-muted)]">
        {context.description}
      </p>
    </section>
  );
}

function DraftConfirmationCard({ draft, onSave, onDiscard }) {
  if (!draft) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.82)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Draft Konfirmasi
          </p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--app-text)]">
            {draft.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">{draft.note}</p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          Total {formatRupiah(draft.total)}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {draft.items.map((item) => (
          <div
            key={`${draft.source}-${item.name}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]/50 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-[var(--app-text)]">{item.name}</p>
              <p className="mt-1 text-xs text-[var(--app-text-muted)]">
                {item.quantity} item x {formatRupiah(item.price)}
              </p>
            </div>

            <p className="text-sm font-semibold text-[var(--app-text-soft)]">
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
          className="rounded-xl border-[var(--app-border)] bg-[var(--app-surface)]/80 text-[var(--app-text-soft)] hover:bg-[var(--app-surface)]"
        >
          <X className="h-4 w-4" />
          Batalkan
        </Button>
      </div>
    </section>
  );
}

function ScannerModal({ isOpen, onClose, onSelectProduct }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--app-surface)]/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_30px_80px_-34px_rgba(2,6,23,0.9)]">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--app-border)] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
              Scan Barcode
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--app-text)]">
              Simulasi scanner produk
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
              Pilih salah satu hasil scan agar alurnya langsung berlanjut ke
              draft transaksi tanpa keluar dari percakapan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
            aria-label="Tutup scanner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-dashed border-blue-500/25 bg-[var(--app-surface)]/60 p-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <ScanLine className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--app-text)]">
              Scanner siap digunakan
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
              Nanti di tahap implementasi fitur penuh, area ini bisa diganti
              kamera scanner barcode. Untuk sekarang, pilih hasil scan yang
              ingin Anda lanjutkan.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {scannerProducts.map((product) => (
              <button
                key={product.barcode}
                type="button"
                onClick={() => onSelectProduct(product)}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/50 p-4 text-left transition hover:border-blue-500/30 hover:bg-[var(--app-surface)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--app-text)]">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-[var(--app-text-muted)]">
                      Barcode {product.barcode}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--app-text-soft)]">
                      {formatRupiah(product.price)}
                    </p>
                    <p className="mt-1 text-xs text-[var(--app-text-muted)]">
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
  );
}

function ChatThread({
  onOpenScanner,
  onOpenDraft,
  onPrepareUpload,
  onUseStarterPrompt,
  onSaveConversation,
  onComposerInputChange,
  hasDraft,
  conversationHasContent,
  conversationStatus,
  conversationTitle,
  conversationUpdatedAt,
  saveFeedback,
  isResponding,
  composerInputId,
}) {
  return (
    <ThreadPrimitive.Root className="flex min-h-152 flex-col overflow-hidden rounded-[1.75rem] border border-[var(--app-border)] bg-[linear-gradient(180deg,var(--app-surface-strong)_0%,var(--app-surface)_100%)] shadow-[0_32px_70px_-38px_rgba(2,6,23,0.95)] lg:h-[calc(100vh-20rem)] lg:min-h-168">
      <div className="border-b border-[var(--app-border)] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--app-text)]">Ruang Percakapan</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <ConversationStatusPill status={conversationStatus} />
              <span className="text-xs font-medium text-[var(--app-text-soft)]">
                {conversationTitle}
              </span>
              <span className="text-xs text-[var(--app-text-muted)]">
                Update {formatConversationTime(conversationUpdatedAt)}
              </span>
              {saveFeedback ? (
                <span className="text-xs text-emerald-600">{saveFeedback}</span>
              ) : null}
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--app-text-muted)]">
              Assistant akan membaca intent pesan Anda, lalu memilih apakah
              harus menyapa, memberi insight, atau menyusun draft transaksi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--app-text-muted)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSaveConversation}
              disabled={!conversationHasContent || conversationStatus === "saved" || isResponding}
              className="rounded-xl border-[var(--app-border)] bg-[var(--app-surface)]/80 text-[var(--app-text-soft)] hover:bg-[var(--app-surface)]"
            >
              <Save className="h-4 w-4" />
              Simpan Percakapan
            </Button>
            <button
              type="button"
              onClick={onOpenScanner}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-strong)]/70 px-3 py-1.5 transition hover:border-blue-500/30 hover:text-blue-500"
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
                  ? "border-[var(--app-border)] bg-[var(--app-surface-strong)]/70 hover:border-blue-500/30 hover:text-blue-500"
                  : "cursor-not-allowed border-[var(--app-border)] bg-[var(--app-surface-strong)]/40 text-[var(--app-text-muted)]"
              }`}
            >
              <WalletCards className="h-3.5 w-3.5" />
              Draft konfirmasi
            </button>
          </div>
        </div>
      </div>

      <ThreadPrimitive.Viewport className="flex-1 space-y-5 overflow-y-auto bg-[var(--app-surface)]/35 px-4 py-5 sm:px-6">
        <ThreadPrimitive.Empty>
          <EmptyChatState onUseStarterPrompt={onUseStarterPrompt} />
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      <div className="border-t border-[var(--app-border)] bg-[var(--app-surface)]/80 p-4 sm:p-5">
        <ComposerPrimitive.Root className="space-y-3">
          <ComposerPrimitive.Attachments
            components={{
              Attachment: ComposerAttachment,
            }}
            className="grid gap-2"
          />

          <div className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)]/75 p-4 sm:p-5">
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[var(--app-border)]/80 bg-[var(--app-surface)]/80 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <ComposerPrimitive.AddAttachment asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onPrepareUpload}
                  className="rounded-full text-[var(--app-text-muted)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
                >
                  <Plus className="h-4.5 w-4.5" />
                </Button>
              </ComposerPrimitive.AddAttachment>

              <ComposerPrimitive.Input
                id={composerInputId}
                rows={1}
                onChange={onComposerInputChange}
                placeholder="Reply..."
                className="min-h-0 flex-1 resize-none bg-transparent py-1 text-base leading-6 text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-muted)]"
              />

              <span className="hidden text-sm text-[var(--app-text-muted)] md:inline">Asisten AI</span>

              <ComposerPrimitive.Send asChild>
                <Button
                  type="button"
                  size="icon"
                  className="rounded-full bg-blue-600 text-white hover:bg-blue-500"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </ComposerPrimitive.Send>
            </div>
          </div>
        </ComposerPrimitive.Root>
      </div>
    </ThreadPrimitive.Root>
  );
}

function ChatAssistantPanel() {
  const {
    runtime,
    isScannerOpen,
    activeContext,
    pendingDraft,
    savedDraftCount,
    isResponding,
    activeModeMeta,
    composerInputId,
    draftSectionRef,
    conversationStatus,
    conversationTitle,
    conversationPreview,
    conversationUpdatedAt,
    conversationHasContent,
    saveFeedback,
    showSaveSuggestion,
    prepareBusinessMode,
    prepareDraftMode,
    prepareUploadMode,
    handleComposerInputChange,
    handleUseStarterPrompt,
    handleOpenScanner,
    handleCloseScanner,
    handleSelectScannerProduct,
    handleSaveConversation,
    handleDismissSaveSuggestion,
    handleSaveDraft,
    handleDiscardDraft,
    handleOpenDraft,
  } = useChatAssistantFlow();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <style>{` 
        .assistant-message-body,
        .assistant-message-body * {
          color: var(--app-text) !important;
        }
        .assistant-message-body p,
        .assistant-message-body li,
        .assistant-message-body span {
          color: var(--app-text-soft) !important;
        }
        .assistant-message-body strong,
        .assistant-message-body b {
          color: var(--app-text) !important;
        }
        .assistant-message-body a {
          color: #2563eb !important;
          text-decoration: underline;
        }
        .assistant-message-body mark {
          background: rgba(37, 99, 235, 0.14) !important;
          color: #1d4ed8 !important;
          padding: 0.05rem 0.25rem;
          border-radius: 0.35rem;
        }
        .assistant-message-body ul,
        .assistant-message-body ol {
          padding-left: 1.25rem;
        }
        .user-message-body,
        .user-message-body * {
          color: white !important;
        }
        .user-message-body mark {
          background: rgba(255, 255, 255, 0.18) !important;
          color: white !important;
          padding: 0.05rem 0.25rem;
          border-radius: 0.35rem;
        }
      `}</style>
      <div className="app-page-stack">
        <ConversationSessionSummary
          conversationStatus={conversationStatus}
          conversationTitle={conversationTitle}
          conversationPreview={conversationPreview}
          conversationUpdatedAt={conversationUpdatedAt}
          saveFeedback={saveFeedback}
        />

        <QuickActionSection
          onPrepareDraft={prepareDraftMode}
          onPrepareBusiness={prepareBusinessMode}
          onOpenScanner={handleOpenScanner}
          onPrepareUpload={prepareUploadMode}
        />

        <ContextBar context={activeContext} />

        {savedDraftCount > 0 ? (
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-600">
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
          onPrepareUpload={prepareUploadMode}
          onUseStarterPrompt={handleUseStarterPrompt}
          onSaveConversation={handleSaveConversation}
          onDismissSaveSuggestion={handleDismissSaveSuggestion}
          onComposerInputChange={handleComposerInputChange}
          hasDraft={Boolean(pendingDraft)}
          conversationHasContent={conversationHasContent}
          conversationStatus={conversationStatus}
          conversationTitle={conversationTitle}
          conversationUpdatedAt={conversationUpdatedAt}
          saveFeedback={saveFeedback}
          showSaveSuggestion={showSaveSuggestion}
          isResponding={isResponding}
          activeModeMeta={activeModeMeta}
          composerInputId={composerInputId}
        />
      </div>

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={handleCloseScanner}
        onSelectProduct={handleSelectScannerProduct}
      />
    </AssistantRuntimeProvider>
  );
}

export default ChatAssistantPanel;































