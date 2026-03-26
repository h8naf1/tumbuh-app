import { ReceiptText, UserRound, WalletCards, X } from 'lucide-react'
import ProductImage from '../../products/ProductImage.jsx'

function TransactionDetailModal({ transaction, formatRupiah, onClose, statusStyles }) {
  if (!transaction) {
    return null
  }

  const statusStyle = statusStyles[transaction.status] || statusStyles.Selesai
  const totalAmount = transaction.total ?? Number(String(transaction.price).replace(/\D/g, ''))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_30px_80px_-34px_rgba(2,6,23,0.25)] transition-colors duration-300">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--app-border)] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
              Detail Transaksi
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--app-text)]">
              #{transaction.id}
            </h2>
            <p className="mt-2 text-sm text-[var(--app-text-soft)]">
              Periksa ringkasan transaksi sebelum melanjutkan tindakan berikutnya.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-soft)] transition hover:text-[var(--app-text)]"
            aria-label="Tutup detail transaksi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
            <div className="flex items-center gap-3">
              <ProductImage
                src={transaction.image}
                alt={transaction.productName}
                label={transaction.productName.slice(0, 2)}
                tone="from-slate-300 via-slate-100 to-slate-400"
                className="w-11"
                roundedClassName="rounded-xl"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--app-text)]">
                  {transaction.productName}
                </p>
                <p className="mt-1 text-xs text-[var(--app-text-muted)]">
                  {transaction.quantity ?? 1} item
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <div className="flex items-center gap-2 text-[var(--app-text-soft)]">
                <UserRound className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">Pembeli</p>
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--app-text)]">
                {transaction.customerName || 'Pelanggan Umum'}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <div className="flex items-center gap-2 text-[var(--app-text-soft)]">
                <WalletCards className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">Pembayaran</p>
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--app-text)]">
                {transaction.paymentMethod}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">Tanggal</p>
              <p className="mt-2 text-sm font-medium text-[var(--app-text)]">
                {transaction.date || 'Data belum tersedia'}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">Total</p>
              <p className="mt-2 text-sm font-medium text-[var(--app-text)]">
                {formatRupiah(totalAmount || 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
              <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">Status</p>
              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide outline outline-1 outline-offset-[-1px] ${statusStyle.badgeClassName}`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetailModal
