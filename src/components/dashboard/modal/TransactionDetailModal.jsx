import { ReceiptText, UserRound, WalletCards, X } from 'lucide-react'
import ProductImage from '../../products/ProductImage.jsx'

function TransactionDetailModal({ transaction, formatRupiah, onClose, statusStyles }) {
  if (!transaction) {
    return null
  }

  const statusStyle = statusStyles[transaction.status] || statusStyles.Selesai
  const totalAmount = transaction.total ?? Number(String(transaction.price).replace(/\D/g, ''))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[1.75rem] border border-slate-800 bg-slate-900 shadow-[0_30px_80px_-34px_rgba(2,6,23,0.9)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              Detail Transaksi
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              #{transaction.id}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Periksa ringkasan transaksi sebelum melanjutkan tindakan berikutnya.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:text-white"
            aria-label="Tutup detail transaksi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
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
                <p className="text-sm font-semibold text-white">
                  {transaction.productName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {transaction.quantity ?? 1} item
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <UserRound className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">Pembeli</p>
              </div>
              <p className="mt-2 text-sm font-medium text-white">
                {transaction.customerName || 'Pelanggan Umum'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <WalletCards className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">Pembayaran</p>
              </div>
              <p className="mt-2 text-sm font-medium text-white">
                {transaction.paymentMethod}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Tanggal</p>
              <p className="mt-2 text-sm font-medium text-white">
                {transaction.date || 'Data belum tersedia'}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total</p>
              <p className="mt-2 text-sm font-medium text-white">
                {formatRupiah(totalAmount || 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
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


