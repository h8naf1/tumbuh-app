import { Clock3, ReceiptText, Wallet } from 'lucide-react'
import KpiCard from '../ui/KpiCard.jsx'

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
          <KpiCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            Icon={Icon}
            iconClassName={metric.iconClassName}
            badge={metric.badge}
            badgeClassName={metric.badgeClassName}
          />
        )
      })}
    </section>
  )
}

export default TransactionStats
