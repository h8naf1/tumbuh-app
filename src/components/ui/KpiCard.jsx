function KpiCard({
  title,
  value,
  Icon,
  iconClassName = 'bg-blue-500/10 text-blue-500',
  badge,
  badgeClassName = 'bg-emerald-500/10 text-emerald-500',
}) {
  return (
    <article className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 shadow-[0_24px_48px_-32px_rgba(2,6,23,0.18)] transition-colors duration-300 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--app-text-soft)]">{title}</p>
          <p className="mt-5 text-[1.85rem] font-bold tracking-tight text-[var(--app-text)] sm:text-[2rem]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {badge ? (
        <div className="mt-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClassName}`}
          >
            {badge}
          </span>
        </div>
      ) : null}
    </article>
  )
}

export default KpiCard
