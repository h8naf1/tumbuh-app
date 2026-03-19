function SalesChartCard({ title, description, tabs, data }) {
  const chartWidth = 720
  const chartHeight = 220
  const paddingX = 28
  const paddingTop = 20
  const paddingBottom = 28
  const maxValue = Math.max(...data.map((item) => item.amount), 1)
  const innerWidth = chartWidth - paddingX * 2
  const innerHeight = chartHeight - paddingTop - paddingBottom
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth

  const points = data.map((item, index) => {
    const x = paddingX + stepX * index
    const y = paddingTop + innerHeight - (item.amount / maxValue) * innerHeight

    return { ...item, x, y }
  })

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`
  const highlightedPoint = points[Math.floor(points.length / 2)]

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                tab.isActive
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="relative h-56 overflow-hidden rounded-lg sm:h-64">
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {[1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-slate-800" />
            ))}
          </div>

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="relative h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sales-area-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(59 130 246 / 0.24)" />
                <stop offset="100%" stopColor="rgb(59 130 246 / 0)" />
              </linearGradient>
            </defs>

            <path d={areaPath} fill="url(#sales-area-gradient)" />
            <path
              d={linePath}
              fill="none"
              stroke="rgb(59 130 246)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point) => (
              <circle
                key={point.day}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="rgb(59 130 246)"
              />
            ))}

            <circle
              cx={highlightedPoint.x}
              cy={highlightedPoint.y}
              r="8"
              fill="rgb(59 130 246 / 0.18)"
            />
            <circle
              cx={highlightedPoint.x}
              cy={highlightedPoint.y}
              r="5"
              fill="rgb(59 130 246)"
            />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 px-1 text-[11px] sm:gap-2 sm:px-2">
          {data.map((item) => (
            <div
              key={item.day}
              className="text-center text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SalesChartCard
