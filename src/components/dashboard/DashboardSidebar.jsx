import {
  Bot,
  Grid2x2,
  Package,
  Settings,
  ShoppingBag,
} from 'lucide-react'

const sidebarIcons = {
  dashboard: Grid2x2,
  products: Package,
  transactions: ShoppingBag,
  'chat-assistant': Bot,
  settings: Settings,
}

function DashboardSidebar({ items, userProfile }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 p-4 sm:p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-lg font-bold text-white shadow-[0_12px_24px_-16px_rgba(59,130,246,0.8)]">
          T
        </div>

        <div className="min-w-0">
          <p className="text-xl font-bold leading-5 text-white">TUMBUH</p>
          <p className="mt-1 text-xs text-slate-400">UMKM Management</p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 pt-2">
        <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
          {items.map((item) => {
            const Icon = sidebarIcons[item.id] || Grid2x2

            return (
              <div
                key={item.id}
                className={`shrink-0 lg:shrink ${item.isSeparated ? 'lg:mt-4 lg:border-t lg:border-slate-800 lg:pt-4' : ''}`}
              >
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition sm:text-base ${
                    item.isActive
                      ? 'bg-blue-500/10 font-medium text-blue-500'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="h-10 w-10 rounded-full object-cover"
          />

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
