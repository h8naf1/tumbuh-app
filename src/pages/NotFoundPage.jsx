import { AlertTriangle, ArrowLeft, Compass } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout.jsx'

function NotFoundPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <AuthLayout>
      <div className="mt-4 w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/88 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:mt-5 sm:p-6 lg:max-w-2xl lg:px-7 lg:py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Error 404
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Halaman tidak ditemukan
            </h1>
            <p className="text-sm leading-6 text-slate-400 sm:text-base">
              Alamat yang Anda buka tidak tersedia, salah ketik, atau halamannya sudah dipindahkan.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-white">Detail alamat</p>
          <p className="mt-2 break-all rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
            {pathname}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Jika Anda membuka link lama atau mengetik URL manual, coba kembali ke halaman utama atau masuk ke dashboard.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>

          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-800"
          >
            <Compass className="h-4 w-4" />
            Ke Landing
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-500"
          >
            Buka Dashboard
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default NotFoundPage
