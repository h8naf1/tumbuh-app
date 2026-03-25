import { MoreVertical } from 'lucide-react'
import ProductImage from '../products/ProductImage.jsx'

function TransactionTable({
  transactions,
  statusStyles,
  formatRupiah,
  onSelectTransaction,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_20px_45px_-32px_rgba(2,6,23,0.82)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-white">Daftar Transaksi</h2>
          <p className="mt-1 text-sm text-slate-400">
            Pantau penjualan terbaru dan status transaksi usaha Anda.
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          {transactions.length} transaksi
        </span>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Produk
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Pembeli
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Tanggal
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Metode
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Total
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
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
                  className="border-t border-slate-800 text-sm text-slate-100"
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
                        <p className="font-medium text-slate-100">
                          {transaction.productName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {transaction.quantity} item
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-5">
                    {transaction.customerName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-5 text-slate-300">
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
                      className="text-slate-400 transition hover:text-slate-200"
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
              className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"
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
                    <p className="text-sm font-semibold text-white">#{transaction.id}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {transaction.productName}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTransaction?.(transaction)}
                  className="text-slate-400 transition hover:text-slate-200"
                  aria-label={`Aksi untuk ${transaction.id}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Pembeli
                  </p>
                  <p className="mt-1 text-sm text-slate-100">
                    {transaction.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Tanggal
                  </p>
                  <p className="mt-1 text-sm text-slate-100">{transaction.date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Metode
                  </p>
                  <p className="mt-1 text-sm text-slate-100">
                    {transaction.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Total
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    {formatRupiah(transaction.total)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">{transaction.quantity} item</p>
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
