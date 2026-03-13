function HomeSection() {
  const metrics = [
    { label: 'Prediksi omzet', value: '+18%', tone: 'from-sky-500 to-blue-600' },
    { label: 'Percakapan aktif', value: '124', tone: 'from-cyan-400 to-sky-500' },
    { label: 'Respon AI', value: '< 3 dtk', tone: 'from-blue-500 to-indigo-600' },
  ]

  return (
    <section
      id="home"
      className="flex min-h-screen scroll-mt-28 items-center overflow-hidden bg-[#eef3f8] px-6 pb-16 pt-32 sm:pt-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Platform AI untuk UMKM
          </p>
          <h1 className="max-w-lg text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Jalankan bisnis lebih <span className="text-blue-600">cepat</span>{' '}
            dengan AI.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-slate-600 sm:text-lg">
            Tampilan utama dibuat tetap bersih dan ringan agar mudah dipahami pemilik
            usaha kecil dan nyaman digunakan setiap hari.
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
      </div>
    </section>
  )
}

export default HomeSection
