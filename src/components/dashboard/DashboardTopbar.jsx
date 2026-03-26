import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, CircleUserRound, LogOut, Menu, Settings } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardNotifications } from '../../data/dashboardData.js'
import ThemeToggle from '../theme/ThemeToggle.jsx'

function DashboardTopbar({
  ownerLabel = 'Pemilik Usaha',
  title,
  subtitle,
  showGreeting = !title,
  showProfileButton = true,
  profileHref = '/pengaturan/account',
  onMenuToggle,
}) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(dashboardNotifications)
  const notificationRef = useRef(null)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setIsNotificationOpen(false)
      }

      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsNotificationOpen(false)
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.isUnread).length,
    [notifications],
  )

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((item) => ({
        ...item,
        isUnread: false,
      })),
    )
  }

  const handleOpenNotifications = () => {
    setIsNotificationOpen((open) => !open)
    setIsProfileMenuOpen(false)
  }

  const handleToggleProfileMenu = () => {
    setIsProfileMenuOpen((open) => !open)
    setIsNotificationOpen(false)
  }

  const handleLogout = () => {
    setIsProfileMenuOpen(false)
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4 lg:min-h-[84px] lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface-strong)] hover:text-[var(--app-text)] lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          {showGreeting ? (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--app-text-muted)] sm:hidden">
                Selamat datang
              </p>
              <div className="mt-0.5 min-w-0 sm:mt-0">
                <p className="truncate text-sm font-semibold text-[var(--app-text)] sm:text-base lg:text-[1.05rem] xl:text-lg">
                  <span className="hidden sm:inline text-[var(--app-text-soft)]">Selamat datang, </span>
                  <span className="text-blue-500">{ownerLabel}</span>
                </p>
              </div>
            </>
          ) : (
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-[var(--app-text)] sm:text-xl xl:text-2xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 hidden text-sm leading-6 text-[var(--app-text-soft)] sm:block lg:max-w-[760px]">
                  {subtitle}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />

        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={handleOpenNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
            aria-label="Notifikasi"
            aria-haspopup="dialog"
            aria-expanded={isNotificationOpen}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-[var(--app-surface-strong)] bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {isNotificationOpen ? (
            <div className="absolute right-0 top-full z-20 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_24px_64px_-34px_rgba(2,6,23,0.25)] transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-[var(--app-border)] px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--app-text)]">Notifikasi</p>
                  <p className="mt-1 text-xs text-[var(--app-text-muted)]">
                    {unreadCount > 0
                      ? `${unreadCount} notifikasi belum dibaca`
                      : 'Semua notifikasi sudah dibaca'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-semibold text-blue-500 transition hover:text-blue-400"
                >
                  Tandai semua
                </button>
              </div>

              <div className="max-h-[360px] overflow-y-auto p-2">
                {notifications.map((item) => (
                  <article
                    key={item.id}
                    className={`rounded-xl border px-3 py-3 transition ${
                      item.isUnread
                        ? 'border-blue-500/20 bg-blue-500/5'
                        : 'border-transparent bg-transparent hover:bg-[var(--app-surface)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          item.isUnread ? 'bg-blue-400' : 'bg-slate-400/50'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-[var(--app-text)]">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-[var(--app-text-soft)]">{item.description}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--app-text-muted)]">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {showProfileButton ? (
          <div ref={profileMenuRef} className="relative">
            <button
              type="button"
              onClick={handleToggleProfileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
              aria-label="Profil pengguna"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
            >
              <CircleUserRound className="h-5 w-5" />
            </button>

            {isProfileMenuOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 w-[220px] rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-2 shadow-[0_24px_64px_-34px_rgba(2,6,23,0.25)] transition-colors duration-300">
                <Link
                  to={profileHref}
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--app-text)] transition hover:bg-[var(--app-surface)]"
                >
                  <Settings className="h-4 w-4 text-blue-400" />
                  <span>Profil</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-rose-400 transition hover:bg-[var(--app-surface)] hover:text-rose-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DashboardTopbar
