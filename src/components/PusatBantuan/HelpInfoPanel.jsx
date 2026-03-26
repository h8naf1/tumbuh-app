import { Clock, MessageSquareHeart, ShieldCheck } from 'lucide-react'

const infoItems = [
  {
    icon: Clock,
    title: 'Respons Cepat',
    desc: 'Tim kami merespons dalam 1x24 jam di hari kerja.',
    color: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: MessageSquareHeart,
    title: 'Dukungan Manusia',
    desc: 'Anda berbicara langsung dengan tim support kami, bukan bot.',
    color: 'text-sky-600 bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Aman & Terpercaya',
    desc: 'Data dan laporan Anda dijaga kerahasiaannya.',
    color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  },
]

function HelpInfoPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
          Pusat Bantuan
        </p>
        <h2 className="mt-2 text-xl font-bold leading-snug text-(--app-text)">
          Kenapa lapor ke sini?
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--app-text-soft)">
          TUMBUH hadir bukan hanya sebagai alat, tapi sebagai mitra usaha. Kami ingin tahu jika ada yang tidak berjalan semestinya.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {infoItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-(--app-border) bg-(--app-surface-strong) p-4"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-(--app-text)">{item.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-(--app-text-soft)">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-(--app-border) pt-4">
        <p className="text-xs leading-5 text-(--app-text-muted)">
          Untuk kendala mendesak, Anda juga bisa menggunakan{' '}
          <span className="font-medium text-blue-500">Asisten Chat</span> di dalam aplikasi untuk bantuan real-time.
        </p>
      </div>
    </div>
  )
}

export default HelpInfoPanel
