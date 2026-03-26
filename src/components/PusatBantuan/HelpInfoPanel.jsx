import { Clock, MessageSquareHeart, ShieldCheck } from 'lucide-react'

const infoItems = [
  {
    icon: Clock,
    title: 'Respons Cepat',
    desc: 'Tim kami merespons dalam 1×24 jam di hari kerja.',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: MessageSquareHeart,
    title: 'Dukungan Manusia',
    desc: 'Anda berbicara langsung dengan tim support kami, bukan bot.',
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Aman & Terpercaya',
    desc: 'Data dan laporan Anda dijaga kerahasiaannya.',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
]

function HelpInfoPanel() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header panel */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          Pusat Bantuan
        </p>
        <h2 className="mt-2 text-xl font-bold leading-snug text-white">
          Kenapa lapor ke sini?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          TUMBUH hadir bukan hanya sebagai alat, tapi sebagai mitra usaha. Kami ingin tahu jika ada yang tidak berjalan semestinya.
        </p>
      </div>

      {/* Info card items */}
      <div className="flex flex-col gap-3">
        {infoItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider + note kecil */}
      <div className="border-t border-slate-800 pt-4">
        <p className="text-xs leading-5 text-slate-600">
          Untuk kendala mendesak, Anda juga bisa menggunakan{' '}
          <span className="text-slate-400">Asisten Chat</span> di dalam aplikasi untuk bantuan real-time.
        </p>
      </div>
    </div>
  )
}

export default HelpInfoPanel
