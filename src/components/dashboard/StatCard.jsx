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
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-slate-400">{card.title}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-8 text-xl font-bold text-slate-100 sm:mt-10 sm:text-2xl">
        {card.value}
      </p>
      <p className="mt-3 text-sm font-medium text-emerald-500">{card.trend}</p>
    </article>
  )
}

export default StatCard
