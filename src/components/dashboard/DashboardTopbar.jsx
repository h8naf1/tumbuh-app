import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, CircleUserRound, LogOut, Settings } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardNotifications } from '../../data/dashboardData.js'

function DashboardTopbar({
  ownerLabel = 'Pemilik Usaha',
  title,
  subtitle,
  showGreeting = !title,
  showProfileButton = true,
  profileHref = '/pengaturan/account',
}) {
  // State utama untuk panel notifikasi dan menu profil.
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(dashboardNotifications)
  const notificationRef = useRef(null)
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  // Effect untuk menutup panel saat klik luar atau tekan Escape.
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

  // Jumlah notifikasi yang masih belum dibaca.
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.isUnread).length,
    [notifications],
  )

  // Handler notifikasi dan profil.
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
    <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-5 lg:px-6">
      {/* Judul halaman atau sapaan dashboard. */}
      <div>
        {showGreeting ? (
          <p className="text-sm font-semibold text-slate-100 sm:text-base lg:text-lg">
            Selamat datang, <span className="text-blue-500">{ownerLabel}</span>
          </p>
        ) : (
          <div>
            <h1 className="text-lg font-bold text-white sm:text-xl xl:text-2xl">{title}</h1>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        )}
      </div>

      {/* Tombol utilitas header. */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={handleOpenNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
            aria-label="Notifikasi"
            aria-haspopup="dialog"
            aria-expanded={isNotificationOpen}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-slate-900 bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {isNotificationOpen ? (
            <div className="absolute right-0 top-full z-20 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-800 bg-slate-950 shadow-[0_24px_64px_-34px_rgba(2,6,23,0.72)]">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-white">Notifikasi</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {unreadCount > 0
                      ? `${unreadCount} notifikasi belum dibaca`
                      : 'Semua notifikasi sudah dibaca'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
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
                        : 'border-transparent bg-transparent hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          item.isUnread ? 'bg-blue-400' : 'bg-slate-700'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-100">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              aria-label="Profil pengguna"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
            >
              <CircleUserRound className="h-5 w-5" />
            </button>

            {isProfileMenuOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 w-[220px] rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-[0_24px_64px_-34px_rgba(2,6,23,0.72)]">
                <Link
                  to={profileHref}
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-slate-900 hover:text-white"
                >
                  <Settings className="h-4 w-4 text-blue-400" />
                  <span>Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-rose-300 transition hover:bg-slate-900 hover:text-rose-200"
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