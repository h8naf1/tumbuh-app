import { HeadphonesIcon } from 'lucide-react'
import HelpForm from './HelpForm.jsx'
import HelpInfoPanel from './HelpInfoPanel.jsx'

function HelpCenterCard() {
  return (
    <div className="w-full">
      {/* Header section */}
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        {/* Icon support */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-blue-500/25 blur-xl" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/15">
            <HeadphonesIcon className="h-6 w-6 text-blue-400" />
          </div>
        </div>

        <div>
          <h1 className="fluid-title font-bold text-white">
            Apa yang bisa kami bantu?
          </h1>
          <p className="mt-1.5 text-sm leading-6 text-slate-400">
            Tim kami akan membantu Anda secepat mungkin. Ceritakan kendala Anda di bawah ini.
          </p>
        </div>
      </div>

      {/* Grid 2 kolom: form kiri, info panel kanan */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
        {/* Card form */}
        <div className="rounded-2xl border border-slate-800/90 bg-[linear-gradient(175deg,rgba(15,23,42,0.95)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_24px_60px_-32px_rgba(2,6,23,0.75)] sm:p-7">
          {/* Top accent line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <HelpForm />
        </div>

        {/* Info panel */}
        <div className="lg:pt-2">
          <HelpInfoPanel />
        </div>
      </div>
    </div>
  )
}

export default HelpCenterCard
