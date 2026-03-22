import { MoreVertical } from 'lucide-react'

function RecentTransactionsCard({ title, transactions, statusStyles }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 p-4 sm:p-5 xl:p-6">
        <h2 className="text-lg font-bold text-slate-100 sm:text-xl">{title}</h2>

        <button
          type="button"
          className="text-sm font-semibold text-blue-500 transition hover:text-blue-400"
        >
          Lihat Semua
        </button>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[760px] w-full text-left">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                ID Transaksi
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Nama Produk
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Harga
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Metode
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
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
                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    #{transaction.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-slate-700" />
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

      <div className="space-y-3 p-4 md:hidden">
        {transactions.map((transaction) => {
          const statusStyle =
            statusStyles[transaction.status] || statusStyles.Selesai

          return (
            <article
              key={transaction.id}
              className="rounded-lg border border-slate-800 bg-slate-950/40 p-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    #{transaction.id}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {transaction.productName}
                  </p>
                </div>

                <button
                  type="button"
                  className="text-slate-400 transition hover:text-slate-200"
                  aria-label={`Aksi untuk ${transaction.id}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Harga</p>
                  <p className="mt-1 text-slate-100">{transaction.price}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Metode</p>
                  <p className="mt-1 text-slate-100">{transaction.paymentMethod}</p>
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
