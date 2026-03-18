import { Lightbulb, TrendingUp } from 'lucide-react'

const insightStyles = {
  success: {
    containerClassName: 'border-emerald-500/10 bg-emerald-500/5',
    iconClassName: 'text-emerald-500',
  },
  info: {
    containerClassName: 'border-blue-500/10 bg-blue-500/5',
    iconClassName: 'text-blue-500',
  },
}

function BusinessInsightCard({ title, items }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="absolute right-[-28px] top-[-28px] h-28 w-28 rounded-full bg-blue-500/5 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-bold text-blue-500">{title}</h2>
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item) => {
            const style = insightStyles[item.tone] || insightStyles.info
            const Icon = item.tone === 'success' ? TrendingUp : Lightbulb

            return (
              <article
                key={item.id}
                className={`rounded-lg border p-4 ${style.containerClassName}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconClassName}`} />

                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Lihat Detail Insight
        </button>
      </div>
    </section>
  )
}

export default BusinessInsightCard
