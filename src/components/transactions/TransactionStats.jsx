import { Clock3, ReceiptText, Wallet } from 'lucide-react'

const statIcons = {
  'total-transactions': ReceiptText,
  'today-revenue': Wallet,
  'pending-transactions': Clock3,
}

function TransactionStats({ metrics }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = statIcons[metric.id] || ReceiptText

        return (
          <article
            key={metric.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.8)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">{metric.title}</p>
                <p className="mt-4 text-2xl font-bold text-white">{metric.value}</p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.iconClassName}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {metric.badge ? (
              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${metric.badgeClassName}`}
                >
                  {metric.badge}
                </span>
              </div>
            ) : null}
          </article>
        )
      })}
    </section>
  )
}

export default TransactionStats
