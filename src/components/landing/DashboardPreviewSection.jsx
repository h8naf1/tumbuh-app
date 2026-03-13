function DashboardPreviewSection() {
  const metrics = [
    { label: 'Prediksi omzet', value: '+18%', tone: 'from-sky-500 to-blue-600' },
    { label: 'Percakapan aktif', value: '124', tone: 'from-cyan-400 to-sky-500' },
    { label: 'Produk terjual', value: '312', tone: 'from-blue-500 to-indigo-600' },
  ]

  return (
    <section
      id="dashboard"
      className="flex min-h-screen scroll-mt-28 items-center bg-[#eef3f8] px-6 py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Preview Dashboard
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Lihat kondisi usaha dalam satu tampilan yang mudah dipahami.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Dashboard TUMBUH membantu pemilik UMKM membaca penjualan, aktivitas
            pelanggan, dan rekomendasi penting tanpa perlu membuka banyak halaman.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] lg:max-w-[560px]">
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-blue-200/70 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-cyan-200/70 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.88)_0%,rgba(235,244,255,0.72)_100%)] p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(15,23,42,0.45)]">
            <div className="rounded-[1.7rem] border border-white/80 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.2),rgba(15,23,42,0.96)_58%)] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Ringkasan Langsung
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    Asisten UMKM
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sky-300">
                  Aktif
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
                  Rekomendasi AI
                </p>
                <p className="mt-2 text-sm leading-7 text-sky-50">
                  Penjualan camilan meningkat di sore hari. Coba tambah stok produk
                  favorit sebelum jam ramai dimulai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPreviewSection
