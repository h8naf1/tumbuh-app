function DashboardLayout({ sidebar, topbar, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
        <aside className="w-full shrink-0 border-b border-slate-800 bg-slate-900 lg:h-screen lg:w-60 lg:overflow-y-auto lg:border-b-0 lg:border-r xl:w-64">
          {sidebar}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
            <div className="mx-auto w-full max-w-[1360px]">{topbar}</div>
          </header>

          <main className="flex-1 px-4 py-4 sm:px-5 sm:py-5 xl:px-6 xl:py-6">
            <div className="mx-auto w-full max-w-[1360px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
