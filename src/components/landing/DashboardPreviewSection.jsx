function DashboardPreviewSection() {
  const metrics = [
    { label: 'Prediksi omzet', value: '+18%', tone: 'from-sky-500 to-blue-600' },
    { label: 'Percakapan aktif', value: '124', tone: 'from-cyan-400 to-sky-500' },
    { label: 'Produk terjual', value: '312', tone: 'from-blue-500 to-indigo-600' },
  ]

  return (
    <section
      id="dashboard"
      className="flex min-h-[78svh] short-screen-safe scroll-mt-28 items-center bg-slate-950 px-5 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[0.82fr_1fr] xl:gap-12">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Preview Dashboard
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-[2.65rem]">
            Lihat kondisi usaha dalam satu tampilan yang mudah dipahami.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-300 sm:text-base">
            Dashboard TUMBUH membantu pemilik UMKM membaca penjualan, aktivitas
            pelanggan, dan rekomendasi penting tanpa perlu membuka banyak halaman.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[400px] lg:max-w-[500px]">
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[linear-gradient(160deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.98)_100%)] p-3 shadow-[0_30px_80px_-30px_rgba(2,6,23,0.75)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(37,99,235,0.25)]">
            <div className="rounded-[1.7rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),rgba(2,6,23,0.98)_58%)] p-4 sm:p-5">
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







