import { Link, useLocation } from 'react-router-dom'

function AuthLayout({ children }) {
  const { pathname } = useLocation()
  const outerPageClassName = 'min-h-screen bg-slate-100'
  const headerClassName = 'border-b border-slate-200 bg-white/90 backdrop-blur'
  const headerContainerClassName =
    'mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'
  const pageContentClassName =
    'flex min-h-[calc(100vh-81px)] w-full items-center justify-center px-4 sm:px-6 lg:px-8'
  const isRegisterPage = pathname === '/register'
  const formContainerClassName = isRegisterPage ? 'w-full max-w-2xl' : 'w-full max-w-md'
  const authPromptText = isRegisterPage ? 'Sudah punya akun?' : 'Belum punya akun?'
  const authLinkHref = isRegisterPage ? '/login' : '/register'
  const authLinkLabel = isRegisterPage ? 'Masuk' : 'Daftar'

  return (
    <div className={outerPageClassName}>
      <header className={headerClassName}>
        <div className={headerContainerClassName}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
              SA
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">SaleAI</p>
              <p className="text-sm text-slate-500">Platform cerdas untuk UMKM</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 text-sm text-slate-600 sm:flex">
            <span>{authPromptText}</span>
            <Link
              to={authLinkHref}
              className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              {authLinkLabel}
            </Link>
          </div>
        </div>
      </header>

      <main className={pageContentClassName}>
        <section className={formContainerClassName}>{children}</section>
      </main>
    </div>
  )
}

export default AuthLayout
