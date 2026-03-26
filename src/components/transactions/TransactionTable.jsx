import { MoreVertical } from 'lucide-react'
import ProductImage from '../products/ProductImage.jsx'

function TransactionTable({
  transactions,
  statusStyles,
  formatRupiah,
  onSelectTransaction,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_20px_45px_-32px_rgba(2,6,23,0.18)] transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--app-border)] p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--app-text)]">Daftar Transaksi</h2>
          <p className="mt-1 text-sm text-[var(--app-text-soft)]">
            Pantau penjualan terbaru dan status transaksi usaha Anda.
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
          {transactions.length} transaksi
        </span>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full text-left">
          <thead className="bg-[color:color-mix(in_srgb,var(--app-surface)_82%,transparent)]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Produk</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Pembeli</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Tanggal</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Metode</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Total</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const statusStyle =
                statusStyles[transaction.status] || statusStyles.Selesai

              return (
                <tr
                  key={transaction.id}
                  className="border-t border-[var(--app-border)] text-sm text-[var(--app-text)]"
                >
                  <td className="whitespace-nowrap px-6 py-5 font-semibold">
                    #{transaction.id}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={transaction.image}
                        alt={transaction.productName}
                        label={transaction.productName.slice(0, 2)}
                        tone="from-slate-300 via-slate-100 to-slate-400"
                        className="w-9"
                        roundedClassName="rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-[var(--app-text)]">
                          {transaction.productName}
                        </p>
                        <p className="text-xs text-[var(--app-text-muted)]">
                          {transaction.quantity} item
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {transaction.customerName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-[var(--app-text-soft)]">
                    {transaction.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {transaction.paymentMethod}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 font-medium">
                    {formatRupiah(transaction.total)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide outline outline-1 outline-offset-[-1px] ${statusStyle.badgeClassName}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    <button
                      type="button"
                      onClick={() => onSelectTransaction?.(transaction)}
                      className="text-[var(--app-text-soft)] transition hover:text-[var(--app-text)]"
                      aria-label={`Aksi untuk ${transaction.id}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-4 lg:hidden">
        {transactions.map((transaction) => {
          const statusStyle =
            statusStyles[transaction.status] || statusStyles.Selesai

          return (
            <article
              key={transaction.id}
              className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <ProductImage
                    src={transaction.image}
                    alt={transaction.productName}
                    label={transaction.productName.slice(0, 2)}
                    tone="from-slate-300 via-slate-100 to-slate-400"
                    className="w-11"
                    roundedClassName="rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--app-text)]">#{transaction.id}</p>
                    <p className="mt-1 text-sm text-[var(--app-text-soft)]">
                      {transaction.productName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTransaction?.(transaction)}
                  className="text-[var(--app-text-soft)] transition hover:text-[var(--app-text)]"
                  aria-label={`Aksi untuk ${transaction.id}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">
                    Pembeli
                  </p>
                  <p className="mt-1 text-sm text-[var(--app-text)]">
                    {transaction.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">
                    Tanggal
                  </p>
                  <p className="mt-1 text-sm text-[var(--app-text)]">{transaction.date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">
                    Metode
                  </p>
                  <p className="mt-1 text-sm text-[var(--app-text)]">
                    {transaction.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">
                    Total
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--app-text)]">
                    {formatRupiah(transaction.total)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs text-[var(--app-text-muted)]">{transaction.quantity} item</p>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide outline outline-1 outline-offset-[-1px] ${statusStyle.badgeClassName}`}
                >
                  {transaction.status}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TransactionTable
