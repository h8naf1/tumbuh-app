import { Link, useLocation } from 'react-router-dom'
import AuthGlobe from '../components/AuthGlobe.jsx'

function AuthLayout({ children }) {
  const { pathname } = useLocation()
  const isRegisterPage = pathname === '/register'
  const outerPageClassName =
    'min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#eff6ff_28%,_#f8fafc_62%,_#f8fafc_100%)]'
  const headerClassName = 'border-b border-slate-200/80 bg-white/75 backdrop-blur-xl'
  const headerContainerClassName =
    'mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'
  const pageContentClassName =
    'mx-auto flex w-full max-w-7xl px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-81px)] lg:px-8 lg:py-10'
  const formContainerClassName = isRegisterPage ? 'w-full max-w-2xl' : 'w-full max-w-md'
  const authPromptText = isRegisterPage ? 'Sudah punya akun?' : 'Belum punya akun?'
  const authLinkHref = isRegisterPage ? '/login' : '/register'
  const authLinkLabel = isRegisterPage ? 'Masuk' : 'Daftar'
  return (
    <div className={outerPageClassName}>
      <header className={headerClassName}>
        <div className={headerContainerClassName}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200/70">
              TU
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">TUMBUH</p>
              <p className="text-sm text-slate-500">Platform cerdas untuk UMKM</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 text-sm text-slate-600 sm:flex">
            <span>{authPromptText}</span>
            <Link
              to={authLinkHref}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-900"
            >
              {authLinkLabel}
            </Link>
          </div>
        </div>
      </header>

      <main className={pageContentClassName}>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <section className="hidden lg:block">
            <div className="relative flex min-h-[640px] items-center justify-center overflow-hidden">
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
