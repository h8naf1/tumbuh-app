function HomeSection() {
  const metrics = [
    { label: 'Prediksi omzet', value: '+18%', tone: 'from-sky-500 to-blue-600' },
    { label: 'Percakapan aktif', value: '124', tone: 'from-cyan-400 to-sky-500' },
    { label: 'Respon AI', value: '< 3 dtk', tone: 'from-blue-500 to-indigo-600' },
  ]

  return (
    <section
      id="home"
      className="overflow-hidden bg-[#eef3f8] px-6 pb-20 pt-32 sm:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            UMKM AI Platform
          </p>
          <h1 className="max-w-lg text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Jalankan bisnis lebih <span className="text-blue-600">cepat</span>{' '}
            dengan AI.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-slate-600 sm:text-lg">
            Hero kembali memakai visual statis yang bersih supaya ringan, rapi, dan
            lebih mudah dikembangkan tanpa dependensi 3D tambahan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-700">
              Coba Demo
            </button>
            <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Lihat Fitur
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)] backdrop-blur"
              >
                <div className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${item.tone}`} />
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          id="dashboard"
          className="relative mx-auto w-full max-w-[440px] scroll-mt-28 lg:max-w-[560px]"
        >
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-blue-200/70 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-cyan-200/70 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.88)_0%,rgba(235,244,255,0.72)_100%)] p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(15,23,42,0.45)]">
            <div className="rounded-[1.7rem] border border-white/80 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.2),rgba(15,23,42,0.96)_58%)] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Live Overview
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    UMKM Assistant
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sky-300">
                  Online
                </div>
              </div>

              <div className="grid gap-3">
                {metrics.map((item) => (
                  <div
                    key={`panel-${item.label}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition duration-300 hover:border-sky-300/40 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-300">{item.label}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                      </div>
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.tone} shadow-lg`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4 text-white/90">
                <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">
                  AI Recommendation
                </p>
                <p className="mt-2 text-sm leading-7 text-sky-50">
                  Fokuskan promo ke pelanggan yang sudah chat dalam 7 hari terakhir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection
