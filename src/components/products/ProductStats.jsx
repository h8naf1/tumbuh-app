import {
  AlertTriangle,
  Archive,
  LayoutGrid,
} from 'lucide-react'

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
    <article className="rounded-[1.6rem] border border-slate-800 bg-slate-900 p-5 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.95)] xl:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>

        {badge ? (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClassName}`}>
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="text-[1.9rem] font-bold tracking-tight text-white sm:text-[2.15rem]">
          {value}
        </p>
      </div>
    </article>
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
