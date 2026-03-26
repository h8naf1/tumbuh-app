import { FiAlertCircle } from 'react-icons/fi'

function FormToast({ message }) {
  return (
    <div
      className={`pointer-events-none fixed right-4 top-25 z-50 w-[calc(100%-2rem)] max-w-sm transition-all duration-300 sm:right-6 ${
        message ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
    >
      <div className="rounded-2xl border border-red-500/20 bg-[var(--app-surface-strong)]/95 p-4 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <FiAlertCircle className="text-lg" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--app-text)]">Periksa form Anda</p>
            <p className="mt-1 text-sm leading-6 text-[var(--app-text-soft)]">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormToast
