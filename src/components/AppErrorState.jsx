import { AlertTriangle, Home, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

function AppErrorState({
  label = 'Terjadi Kesalahan',
  title = 'Aplikasi mengalami kendala',
  description = 'Halaman ini sedang bermasalah. Silakan muat ulang aplikasi atau kembali ke halaman utama.',
  details,
  showHomeLink = true,
  onRetry,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22)_0%,_rgba(15,23,42,0.96)_28%,_#020617_68%,_#020617_100%)] px-6 text-slate-50">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 backdrop-blur xl:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/12 text-red-300">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
              {label}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
          </div>
        </div>

        {details ? (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-sm font-semibold text-white">Detail teknis</p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-sm leading-6 text-slate-300">
              {details}
            </pre>
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-500"
          >
            <RefreshCcw className="h-4 w-4" />
            Muat Ulang
          </button>

          {showHomeLink ? (
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              Kembali ke Landing
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppErrorState
