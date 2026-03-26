function RoadmapProgressSummary({ businessProfile, progress }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.16)] sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-5 rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface)]/70 p-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--app-text-muted)]">
              Nama Bisnis
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--app-text)]">
              {businessProfile.name}
            </h2>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--app-text-muted)]">
              Tipe
            </p>
            <p className="mt-2 text-sm text-[var(--app-text-soft)]">{businessProfile.type}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--app-text-muted)]">
              Produk Utama
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {businessProfile.mainProducts.map((product) => (
                <span
                  key={product}
                  className="inline-flex rounded-full border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-3 py-1 text-xs text-[var(--app-text)]"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface)]/55 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xl font-bold text-[var(--app-text)]">{progress.title}</p>
              <p className="mt-2 text-sm text-[var(--app-text-muted)]">{progress.description}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-4xl font-black leading-none text-blue-500">
                {progress.percent}%
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--app-text-muted)]">
                {progress.statusLabel}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-[var(--app-border)]/70">
              <div
                className="h-full rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.25)]"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoadmapProgressSummary
