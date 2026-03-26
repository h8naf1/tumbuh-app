import {
  BarChart3,
  CreditCard,
  PackageCheck,
  TrendingUp,
} from 'lucide-react'
import KpiCard from '../ui/KpiCard.jsx'

const statIcons = {
  'total-sales': CreditCard,
  'total-transactions': BarChart3,
  'products-sold': PackageCheck,
  'business-growth': TrendingUp,
}

function StatCard({ card }) {
  const Icon = statIcons[card.id] || BarChart3

  return (
    <KpiCard
      title={card.title}
      value={card.value}
      Icon={Icon}
      badge={card.trend}
      badgeClassName="bg-emerald-500/10 text-emerald-400"
    />
  )
}

export default StatCard
