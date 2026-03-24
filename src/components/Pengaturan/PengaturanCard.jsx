import { forwardRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const PengaturanCard = forwardRef(function PengaturanCard(
  {
    sectionId,
    title,
    description,
    icon: Icon,
    accentClassName,
    isActive,
    onClick,
    onMouseEnter,
    onFocus,
  },
  ref,
) {
  return (
    <button
      ref={ref}
      data-section-id={sectionId}
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={`group relative flex min-h-[15rem] w-full flex-col overflow-hidden rounded-[1.6rem] border bg-slate-900 p-5 text-left transition duration-200 hover:-translate-y-1 sm:p-6 ${
        isActive
          ? 'border-blue-500/40 shadow-[0_20px_40px_-30px_rgba(59,130,246,0.7)]'
          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
      }`}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl transition duration-200 group-hover:bg-blue-500/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentClassName}`}>
          <Icon className="h-7 w-7" />
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/70 text-slate-500 transition group-hover:border-blue-500/30 group-hover:text-blue-400">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="relative mt-8">
        <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </button>
  )
})

export default PengaturanCard
