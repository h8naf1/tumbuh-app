import {
  BarChart3,
  CreditCard,
  PackageCheck,
  TrendingUp,
} from 'lucide-react'

const statIcons = {
  'total-sales': CreditCard,
  'total-transactions': BarChart3,
  'products-sold': PackageCheck,
  'business-growth': TrendingUp,
}

function StatCard({ card }) {
  const Icon = statIcons[card.id] || BarChart3

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] xl:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-400">{card.title}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 sm:h-10 sm:w-10">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <p className="mt-6 text-[1.65rem] font-bold tracking-tight text-slate-100 sm:mt-8 sm:text-[1.85rem] xl:mt-10 xl:text-[2rem]">
        {card.value}
      </p>
      <p className="mt-2 text-sm font-medium text-emerald-500">{card.trend}</p>
    </article>
  )
}

export default StatCard
