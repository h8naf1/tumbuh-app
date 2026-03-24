import {
  Bot,
  Grid2x2,
  Package,
  Settings,
  ShoppingBag,
  Sprout,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

// Mapping icon untuk setiap menu sidebar.
const sidebarIcons = {
  dashboard: Grid2x2,
  products: Package,
  transactions: ShoppingBag,
  'chat-assistant': Bot,
  settings: Settings,
}

// Helper untuk membuat inisial avatar fallback.
function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function DashboardSidebar({ items, userProfile }) {
  return (
    <div className="flex h-full flex-col bg-slate-900">
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-[0_16px_30px_-18px_rgba(59,130,246,0.95)]">
          <Sprout className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight text-white">TUMBUH</p>
        </div>
      </div>

      {/* Daftar menu navigasi dashboard. */}
      <div className="flex-1 px-4 pb-4 pt-2">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
          {items.map((item) => {
            const Icon = sidebarIcons[item.id] || Grid2x2
            const itemClassName = ({ isActive } = {}) =>
              `flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-500/15 text-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
              }`

            return (
              <div
                key={item.id}
                className={`shrink-0 lg:shrink ${item.isSeparated ? 'lg:mt-4 lg:border-t lg:border-slate-800 lg:pt-4' : ''}`}
              >
                {item.href ? (
                  <NavLink to={item.href} className={itemClassName}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <button type="button" className={itemClassName()}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Profil pengguna di bagian bawah sidebar. */}
      <div className="border-t border-slate-800 px-4 py-5">
        <div className="flex items-center gap-3 rounded-xl px-2 py-1">
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

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-100">
              {userProfile.name}
            </p>
            <p className="truncate text-xs text-slate-500">{userProfile.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
