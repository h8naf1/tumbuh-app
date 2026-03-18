import { Bell, CircleUserRound, Search } from 'lucide-react'

function DashboardTopbar({
  ownerLabel = 'Pemilik Usaha',
  searchPlaceholder = 'Cari transaksi...',
}) {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
      <div>
        <p className="text-base font-semibold text-slate-100 sm:text-lg">
          Selamat datang, <span className="text-blue-500">{ownerLabel}</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
        <div className="relative hidden w-full max-w-64 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <div className="rounded-lg bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-500">
            {searchPlaceholder}
          </div>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-slate-900 bg-red-500" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          aria-label="Profil pengguna"
        >
          <CircleUserRound className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default DashboardTopbar
