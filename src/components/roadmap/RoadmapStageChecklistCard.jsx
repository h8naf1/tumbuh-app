import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
} from 'lucide-react'

function RoadmapStageChecklistCard({
  stage,
  onToggleTask,
  onGoToPreviousStage,
  onGoToNextStage,
  canGoToPreviousStage = false,
  canGoToNextStage = false,
  isStageComplete = false,
}) {
  const canAdvance = canGoToNextStage && isStageComplete
  const learning = stage.learning

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_24px_45px_-28px_rgba(15,23,42,0.16)]">
      <div className="flex flex-col gap-4 border-b border-[var(--app-border)] bg-[var(--app-surface)]/65 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-500">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-[var(--app-text)]">{stage.label}</h2>
        </div>

        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-500">
          {stage.badge}
        </span>
      </div>

      <div className="space-y-3 px-5 py-5 sm:px-6">
        {stage.tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => onToggleTask?.(task.id)}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/60 px-4 py-4 text-left transition hover:border-blue-500/20 hover:bg-[var(--app-surface)]/85"
          >
            {task.completed ? (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500 text-white">
                <Check className="h-4 w-4" />
              </div>
            ) : (
              <div className="h-6 w-6 shrink-0 rounded-md border-2 border-[var(--app-text-muted)]/60" />
            )}

            <p
              className={`text-base ${
                task.completed
                  ? 'text-[var(--app-text-muted)] line-through'
                  : 'font-medium text-[var(--app-text)]'
              }`}
            >
              {task.title}
            </p>
          </button>
        ))}

        {!isStageComplete ? (
          <p className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-700 dark:text-amber-200">
            Selesaikan semua checklist pada tahap ini dulu agar bisa lanjut ke step berikutnya.
          </p>
        ) : null}

        {learning ? (
          <div className="mt-5 rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface)]/60 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-500">
                <BookOpen className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-500">
                  Referensi Belajar
                </p>
                <h3 className="mt-2 text-base font-semibold text-[var(--app-text)]">
                  {learning.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
                  {learning.description}
                </p>
              </div>
            </div>

            {learning.type === 'internal' ? (
              <div className="mt-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-4 py-4 text-sm leading-6 text-[var(--app-text-soft)]">
                Tutorial internal akan tersedia di sini.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {learning.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-[var(--app-text)]">
                          {resource.title}
                        </h4>
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--app-text-muted)]">
                          {resource.source}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--app-text-muted)]">
                          {resource.summary}
                        </p>
                      </div>

                      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[var(--app-text-muted)]" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onGoToPreviousStage}
            disabled={!canGoToPreviousStage}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/70 px-5 py-3.5 text-sm font-bold text-[var(--app-text)] transition hover:bg-[var(--app-surface)]/90 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Step Sebelumnya
          </button>

          <button
            type="button"
            onClick={onGoToNextStage}
            disabled={canGoToNextStage ? !canAdvance : true}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_-24px_rgba(59,130,246,0.45)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-[var(--app-border)] disabled:text-[var(--app-text-muted)] disabled:shadow-none sm:w-auto"
          >
            {canGoToNextStage ? stage.ctaLabel : 'Tahap Terakhir Tercapai'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default RoadmapStageChecklistCard
