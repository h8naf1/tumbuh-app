import { Check, Lock, Palette } from 'lucide-react'

const stageStatusStyles = {
  completed: {
    dotClassName: 'bg-emerald-500 text-white border-emerald-400/20',
    labelClassName: 'text-emerald-400',
    lineClassName: 'bg-emerald-500',
    Icon: Check,
  },
  active: {
    dotClassName: 'bg-blue-500 text-white border-blue-400/20 shadow-[0_0_24px_rgba(59,130,246,0.35)]',
    labelClassName: 'text-blue-400',
    lineClassName: 'bg-[var(--app-border)]',
    Icon: Palette,
  },
  locked: {
    dotClassName: 'bg-[var(--app-surface)] text-[var(--app-text-muted)] border-[var(--app-border)]',
    labelClassName: 'text-[var(--app-text-muted)]',
    lineClassName: 'bg-[var(--app-border)]/80',
    Icon: Lock,
  },
}

function RoadmapTimeline({ stages, selectedStageId, onSelectStage }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.16)] sm:p-6">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-0">
        {stages.map((stage, index) => {
          const style = stageStatusStyles[stage.status]
          const Icon = style.Icon
          const isLast = index === stages.length - 1
          const isSelected = selectedStageId === stage.id

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage?.(stage.id)}
              disabled={stage.isDisabled}
              className={`relative flex flex-col items-center rounded-2xl px-3 py-2 text-center transition lg:px-3 ${
                stage.isDisabled
                  ? 'cursor-not-allowed opacity-65'
                  : 'hover:bg-[var(--app-surface)]/70'
              }`}
            >
              {!isLast ? (
                <div className={`absolute left-1/2 top-9 hidden h-0.5 w-full translate-x-10 lg:block ${style.lineClassName}`} />
              ) : null}

              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--app-surface-strong)] ${style.dotClassName}`}>
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-semibold text-[var(--app-text)]">{stage.title}</h3>
              <p className={`mt-2 text-sm font-medium ${style.labelClassName}`}>
                {stage.statusLabel}
              </p>

              {isSelected ? (
                <span className="mt-3 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-500">
                  Dipilih
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default RoadmapTimeline

