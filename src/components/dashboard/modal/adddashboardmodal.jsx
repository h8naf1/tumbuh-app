import { useEffect, useId } from 'react'
import { TrendingUp, X } from 'lucide-react'

function InsightVelocityChart({ data }) {
  const gradientId = useId().replace(/:/g, '')

  if (!data.length) {
    return (
      <div className="flex h-52 items-center justify-center rounded-[20px] bg-slate-900/40 text-sm text-slate-500">
        Data penjualan belum tersedia.
      </div>
    )
  }

  const chartWidth = 312
  const chartHeight = 180
  const paddingX = 18
  const paddingTop = 16
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

  const lastPoint = points[points.length - 1]
  const areaPath = `${linePath} L ${lastPoint.x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`

  return (
    <div>
      <div className="relative h-52 overflow-hidden rounded-[20px] bg-slate-800/70 px-2 py-3">
        <div className="absolute inset-x-4 inset-y-5 flex flex-col justify-between">
          {[1, 2, 3].map((line) => (
            <div key={line} className="border-t border-slate-700/60" />
          ))}
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="relative h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(96 165 250 / 0.25)" />
              <stop offset="100%" stopColor="rgb(96 165 250 / 0)" />
            </linearGradient>
          </defs>

          <path
            d={linePath}
            fill="none"
            stroke="rgb(96 165 250 / 0.22)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            fill="none"
            stroke="rgb(96 165 250)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="9"
            fill="rgb(96 165 250 / 0.18)"
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="5"
            fill="rgb(96 165 250)"
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 px-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {data.map((item) => (
          <div key={item.day} className="text-center">
            {item.day}
          </div>
        ))}
      </div>
    </div>
  )
}

function AddDashboardModal({ isOpen, onClose, featuredInsight, chartData = [] }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[calc(100svh-2rem)] w-full max-w-sm flex-col overflow-hidden rounded-[30px] border border-slate-800 bg-slate-900 shadow-[0_32px_80px_rgba(15,23,42,0.65)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-insight-modal-title"
      >
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[16rem]">
              <h3
                id="business-insight-modal-title"
                className="text-[1.75rem] font-bold leading-tight text-white"
              >
                Detail Insight
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Analisis performa penjualan dan tren terbaru untuk periode saat ini.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Tutup modal insight"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {featuredInsight ? (
            <div className="mt-6 rounded-[24px] border border-blue-500/25 bg-blue-500/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                  <TrendingUp className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-2xl font-semibold leading-tight text-blue-400">
                    {featuredInsight.title}
                  </p>
                  <p className="mt-2 text-base leading-7 text-slate-300">
                    {featuredInsight.description}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Kecepatan Penjualan 7 Hari
            </p>

            <div className="mt-4 rounded-[24px] border border-slate-800 bg-slate-800/70 p-4">
              <InsightVelocityChart data={chartData} />
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-800 bg-slate-900/72 px-6 py-5 backdrop-blur-xl supports-backdrop-filter:bg-slate-900/55 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-slate-700 bg-slate-800/40 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddDashboardModal

