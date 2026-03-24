import { Link } from 'react-router-dom'
import { LifeBuoy } from 'lucide-react'

function PengaturanSupportCard() {
  return (
    <section className="flex flex-col gap-5 rounded-[26px] border border-blue-500/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92))] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 xl:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/12 text-orange-400">
          <LifeBuoy className="h-6 w-6" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white sm:text-xl">Butuh bantuan lebih lanjut?</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            Buka dokumentasi atau hubungi tim support untuk bantuan konfigurasi,
            integrasi, dan troubleshooting sistem bisnis Anda.
          </p>
        </div>
      </div>

      <Link
        to="/asisten-chat"
        className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        Pusat Bantuan
      </Link>
    </section>
  )
}

export default PengaturanSupportCard
