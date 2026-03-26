import { Link } from 'react-router-dom'
import { MoreVertical } from 'lucide-react'
import ProductImage from '../products/ProductImage.jsx'

function RecentTransactionsCard({
  title,
  transactions,
  statusStyles,
  onSelectTransaction,
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--app-border)] p-4 sm:p-5 xl:p-6">
        <h2 className="text-lg font-bold text-[var(--app-text)] sm:text-xl">{title}</h2>

        <Link
          to="/transaksi"
          className="text-sm font-semibold text-blue-500 transition hover:text-blue-400"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-[color:color-mix(in_srgb,var(--app-surface)_82%,transparent)]">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                ID Transaksi
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                Nama Produk
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                Harga
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                Metode
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[var(--app-text-muted)]">
                Aksi
              </th>
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
                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    #{transaction.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={transaction.image}
                        alt={transaction.productName}
                        label={transaction.productName.slice(0, 2)}
                        tone="from-slate-300 via-slate-100 to-slate-400"
                        className="w-8"
                        roundedClassName="rounded-lg"
                      />
                      <span>{transaction.productName}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">{transaction.price}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {transaction.paymentMethod}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide outline outline-1 outline-offset-[-1px] ${statusStyle.badgeClassName}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
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

      <div className="space-y-3 p-4 md:hidden">
        {transactions.map((transaction) => {
          const statusStyle =
            statusStyles[transaction.status] || statusStyles.Selesai

          return (
            <article
              key={transaction.id}
              className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-3.5 transition-colors duration-300"
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
                    <p className="text-sm font-semibold text-[var(--app-text)]">
                      #{transaction.id}
                    </p>
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

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">Harga</p>
                  <p className="mt-1 text-[var(--app-text)]">{transaction.price}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">Metode</p>
                  <p className="mt-1 text-[var(--app-text)]">{transaction.paymentMethod}</p>
                </div>
              </div>

              <div className="mt-4">
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

export default RecentTransactionsCard
