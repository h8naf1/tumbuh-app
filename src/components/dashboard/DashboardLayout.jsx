import { cloneElement, isValidElement, useEffect, useState } from 'react'

function DashboardLayout({ sidebar, topbar, children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const desktopSidebarElement = isValidElement(sidebar)
    ? cloneElement(sidebar, {
        onNavigate: undefined,
        onCloseDrawer: undefined,
        isMobileDrawer: false,
      })
    : sidebar

  const mobileSidebarElement = isValidElement(sidebar)
    ? cloneElement(sidebar, {
        onNavigate: () => setIsMobileSidebarOpen(false),
        onCloseDrawer: () => setIsMobileSidebarOpen(false),
        isMobileDrawer: true,
      })
    : sidebar

  const topbarElement = isValidElement(topbar)
    ? cloneElement(topbar, {
        onMenuToggle: () => setIsMobileSidebarOpen(true),
      })
    : topbar

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:h-screen lg:overflow-hidden">
      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Tutup sidebar"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="relative h-dvh w-70 max-w-[85vw] overflow-y-auto">
  {mobileSidebarElement}
</div>

        </div>
      ) : null}

      <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
        <aside className="hidden shrink-0 border-r border-slate-800 bg-slate-900 lg:flex lg:h-screen lg:w-60 lg:overflow-y-auto xl:w-64">
          {desktopSidebarElement}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/85 backdrop-blur-md">
            <div className="mx-auto w-full max-w-340">{topbarElement}</div>
          </header>

          <main className="flex-1 px-4 py-4 sm:px-5 sm:py-5 xl:px-6 xl:py-6">
            <div className="mx-auto w-full max-w-340">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

