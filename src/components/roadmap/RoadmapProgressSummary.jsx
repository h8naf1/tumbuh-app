function RoadmapProgressSummary({ businessProfile, progress }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-5 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.95)] sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-5 rounded-[1.5rem] border border-slate-800 bg-slate-950/55 p-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Nama Bisnis
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {businessProfile.name}
            </h2>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Tipe
            </p>
            <p className="mt-2 text-sm text-slate-300">{businessProfile.type}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Produk Utama
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {businessProfile.mainProducts.map((product) => (
                <span
                  key={product}
                  className="inline-flex rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-100"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[1.5rem] border border-slate-800 bg-slate-950/35 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xl font-bold text-white">{progress.title}</p>
              <p className="mt-2 text-sm text-slate-400">{progress.description}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-4xl font-black leading-none text-blue-400">
                {progress.percent}%
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                {progress.statusLabel}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.35)]"
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
