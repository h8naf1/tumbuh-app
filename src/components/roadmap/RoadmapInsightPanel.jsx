function RoadmapInsightPanel({ summary }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.16)] sm:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-500">
        {summary.eyebrow}
      </p>

      <div className="mt-5 space-y-4">
        {summary.metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-[var(--app-text-muted)]">{metric.label}</p>
              <p
                className={`text-sm font-bold ${
                  metric.tone === 'positive' ? 'text-emerald-500' : 'text-[var(--app-text)]'
                }`}
              >
                {metric.value}
              </p>
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--app-text-muted)]">{metric.helper}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
          {summary.recommendationTitle}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--app-text-soft)]">
          {summary.recommendationText}
        </p>
      </div>
    </section>
  )
}

export default RoadmapInsightPanel
