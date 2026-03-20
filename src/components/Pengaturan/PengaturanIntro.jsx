import { ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'

function PengaturanIntro({ totalSections }) {
  const highlights = [
    {
      id: 'modules',
      label: 'Modul Aktif',
      value: `${totalSections} menu`,
      icon: SlidersHorizontal,
    },
    {
      id: 'secure',
      label: 'Status Sistem',
      value: 'Aman & sinkron',
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-slate-800 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.84))] p-5 sm:p-6 xl:p-7">
      <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            System Preferences
          </div>

          <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl xl:text-[2rem]">
            Kelola seluruh konfigurasi bisnis dari satu tempat.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Tampilan ini disusun ulang dari mockup ke versi dark theme agar tetap
            selaras dengan dashboard TUMBUH dan mudah dikembangkan per modul.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[24rem]">
          {highlights.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-100">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PengaturanIntro
