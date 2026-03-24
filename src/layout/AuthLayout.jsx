import { Link, useLocation } from 'react-router-dom'
import AuthGlobe from '../components/AuthGlobe.jsx'
function AuthLayout({ children }) {
  // Menentukan mode halaman auth berdasarkan route aktif.
  const { pathname } = useLocation()
  const isRegisterPage = pathname === '/register'
  // Kumpulan class layout agar struktur auth lebih mudah dibaca.
  const outerPageClassName =
    'min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.24)_0%,_rgba(15,23,42,0.96)_28%,_#020617_68%,_#020617_100%)]'
  const headerClassName = 'border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl'
  const headerContainerClassName =
    'mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-4 sm:px-5 lg:px-6'
  const pageContentClassName =
    'mx-auto flex w-full max-w-[1180px] px-4 py-6 sm:px-5 sm:py-8 lg:min-h-[calc(100vh-81px)] lg:px-6 lg:py-8'
  const formContainerClassName =
    isRegisterPage ? 'w-full max-w-[42rem]' : 'w-full max-w-[29rem]'
  const authPromptText = isRegisterPage ? 'Sudah punya akun?' : 'Belum punya akun?'
  const authLinkHref = isRegisterPage ? '/login' : '/register'
  const authLinkLabel = isRegisterPage ? 'Masuk' : 'Daftar'
  return (
    <div className={outerPageClassName}>
      {/* Header halaman auth. */}
      <header className={headerClassName}>
        <div className={headerContainerClassName}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200/70">
              TU
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">TUMBUH</p>
              <p className="text-sm text-slate-400">Asisten penjualan AI untuk UMKM</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-slate-400 sm:flex">
            <span>{authPromptText}</span>
            <Link
              to={authLinkHref}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-2 font-semibold text-slate-100 transition hover:border-blue-500/50 hover:bg-slate-800 hover:text-white"
            >
              {authLinkLabel}
            </Link>
          </div>
        </div>
      </header>
      {/* Layout dua kolom untuk ilustrasi dan form auth. */}
      <main className={pageContentClassName}>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-10">
          <section className="hidden lg:block">
            <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden xl:min-h-[600px]">
              <div className="relative opacity-90">
                <AuthGlobe />
              </div>
            </div>
          </section>
          <section className="flex min-w-0 items-center justify-center">
            <div className={formContainerClassName}>{children}</div>
          </section>
        </div>
      </main>
    </div>
  )
}
export default AuthLayout