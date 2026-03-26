import {
  ArrowLeft,
  Bot,
  Compass,
  Grid2x2,
  HeadphonesIcon,
  Package,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import BrandLogo from "../BrandLogo.jsx";

const sidebarIcons = {
  dashboard: Grid2x2,
  products: Package,
  transactions: ShoppingBag,
  'chat-assistant': Bot,
  roadmap: Compass,
  'help-center': HeadphonesIcon,
  settings: Settings,
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function DashboardSidebar({
  items,
  userProfile,
  onNavigate,
  onCloseDrawer,
  isMobileDrawer = false,
}) {
  return (
    <div className="flex min-h-full flex-col bg-[var(--app-surface-strong)] text-[var(--app-text)] transition-colors duration-300">
      <div className="px-5 py-5 lg:px-6 lg:py-7">
        <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center">
          <BrandLogo className="h-14 w-full max-w-[170px] lg:h-16 lg:max-w-[180px]" />

          {isMobileDrawer ? (
            <button
              type="button"
              onClick={onCloseDrawer}
              className="absolute right-0 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-1 lg:px-5 lg:pt-2">
        <div className="mx-auto w-full max-w-[220px] space-y-2">
          {items.map((item) => {
            const Icon = sidebarIcons[item.id] || Grid2x2
            const itemClassName = ({ isActive } = {}) =>
              `flex min-h-[50px] w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500/15 text-blue-500 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]'
                  : 'text-[var(--app-text-soft)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]'
              }`

            return (
              <div
                key={item.id}
                className={item.isSeparated ? 'mt-5 border-t border-[var(--app-border)] pt-5' : ''}
              >
                {item.href ? (
                  <NavLink
                    to={item.href}
                    className={itemClassName}
                    onClick={onNavigate}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    className={itemClassName()}
                    onClick={onNavigate}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[var(--app-border)] px-4 py-5 lg:px-5">
        <div className="mx-auto w-full max-w-[220px]">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-200/60 bg-gradient-to-br from-orange-100 to-orange-300 text-sm font-semibold text-slate-700">
                {getInitials(userProfile.name)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[var(--app-text)]">
                {userProfile.name}
              </p>
              <p className="truncate text-xs text-[var(--app-text-muted)]">
                {userProfile.role}
              </p>
            </div>
          </div>

          <NavLink
            to="/"
            onClick={onNavigate}
            className="group mt-4 inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--app-text-soft)] transition duration-200 hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition duration-200 group-hover:-translate-x-0.5" />
            <span className="truncate">Lihat Halaman Utama</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
