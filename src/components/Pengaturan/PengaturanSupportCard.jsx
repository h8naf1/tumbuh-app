import { Link } from 'react-router-dom'
import { LifeBuoy } from 'lucide-react'

function PengaturanSupportCard() {
  return (
    <section className="flex flex-col gap-5 rounded-[26px] border border-blue-500/20 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(14,165,233,0.06))] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 xl:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/12 text-orange-500">
          <LifeBuoy className="h-6 w-6" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--app-text) sm:text-xl">Butuh bantuan lebih lanjut?</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-(--app-text-soft)">
            Buka dokumentasi atau hubungi tim support untuk bantuan konfigurasi,
            integrasi, dan troubleshooting sistem bisnis Anda.
          </p>
        </div>
      </div>

      <Link
        to="/pusat-bantuan"
        className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_8px_24px_-8px_rgba(37,99,235,0.55)]"
      >
        Pusat Bantuan
      </Link>
    </section>
  )
}

export default PengaturanSupportCard

