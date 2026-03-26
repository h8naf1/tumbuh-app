import { Link, useLocation } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo.jsx'

function AuthLayout({ children }) {
  const { pathname } = useLocation()
  const isRegisterPage = pathname === '/register'
  const isOnboardingPage = pathname === '/personalisasi-bisnis' || pathname === '/tutorial'

  const outerPageClassName =
    'min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.24)_0%,_rgba(15,23,42,0.96)_28%,_#020617_68%,_#020617_100%)]'
  const headerClassName = 'border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl'
  const headerContainerClassName =
    'mx-auto flex w-full max-w-[1180px] items-center justify-between px-4 py-4 sm:px-5 lg:px-6'
  const pageContentClassName =
    'mx-auto flex w-full max-w-[1180px] items-center justify-center px-4 py-6 sm:px-5 sm:py-8 lg:min-h-[calc(100vh-81px)] lg:px-6 lg:py-8'
  const formContainerClassName = isOnboardingPage
    ? 'w-full max-w-[58rem]'
    : isRegisterPage
      ? 'w-full max-w-[42rem]'
      : 'w-full max-w-[29rem]'
  const authPromptText = isRegisterPage ? 'Sudah punya akun?' : 'Belum punya akun?'
  const authLinkHref = isRegisterPage ? '/login' : '/register'
  const authLinkLabel = isRegisterPage ? 'Masuk' : 'Daftar'

  return (
    <div data-theme="tumbuh" className={outerPageClassName}>
      <header className={headerClassName}>
        <div className={headerContainerClassName}>
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo className="h-14 w-auto sm:h-16" />
            <p className="hidden text-sm text-slate-400 md:block">Asisten penjualan AI untuk UMKM</p>
          </div>

          {isOnboardingPage ? (
            <div className="hidden text-sm font-medium text-slate-400 sm:block">
              Onboarding Kopi Nusantara
            </div>
          ) : (
            <div className="hidden items-center gap-3 text-sm text-slate-400 sm:flex">
              <span>{authPromptText}</span>
              <Link
                to={authLinkHref}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-2 font-semibold text-slate-100 transition hover:border-blue-500/50 hover:bg-slate-800 hover:text-white"
              >
                {authLinkLabel}
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className={pageContentClassName}>
        <section className="flex w-full min-w-0 items-center justify-center">
          <div className={formContainerClassName}>{children}</div>
        </section>
      </main>
    </div>
  )
}

export default AuthLayout

