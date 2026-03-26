import {
  AlertTriangle,
  Archive,
  LayoutGrid,
} from 'lucide-react'
import KpiCard from '../ui/KpiCard.jsx'

const metricIcons = {
  'total-products': Archive,
  'low-stock': AlertTriangle,
  categories: LayoutGrid,
}

function ProductMetricCard({
  metricId,
  title,
  value,
  badge,
  iconClassName,
  badgeClassName,
}) {
  const Icon = metricIcons[metricId] || Archive

  return (
    <KpiCard
      title={title}
      value={value}
      Icon={Icon}
      iconClassName={iconClassName}
      badge={badge}
      badgeClassName={badgeClassName}
    />
  )
}

function ProductStats({ metrics }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <ProductMetricCard
          key={metric.id}
          metricId={metric.id}
          title={metric.title}
          value={metric.value}
          badge={metric.badge}
          iconClassName={metric.iconClassName}
          badgeClassName={metric.badgeClassName}
        />
      ))}
    </section>
  )
}

export default ProductStats
