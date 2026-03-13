function FeaturesSection() {
  const featureCards = [
    {
      title: 'Catat transaksi lebih cepat',
      description:
        'Masukkan penjualan harian dengan alur yang sederhana agar pencatatan terasa ringan dan tidak memakan waktu.',
      badge: '01',
    },
    {
      title: 'Pantau stok lebih rapi',
      description:
        'Lihat ketersediaan produk dan perubahan stok dalam satu tempat supaya usaha tetap berjalan lancar.',
      badge: '02',
    },
    {
      title: 'Lihat perkembangan usaha',
      description:
        'Tampilkan ringkasan penjualan dan insight sederhana yang membantu pemilik usaha membaca kondisi bisnis.',
      badge: '03',
    },
  ]

  return (
    <section
      id="features"
      className="flex min-h-screen scroll-mt-28 items-center bg-[#eef3f8] px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Fitur Utama
            </p>
            <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Fitur yang membantu pemilik UMKM bekerja lebih praktis.
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-slate-600">
            Fokus utama TUMBUH adalah membantu proses harian usaha terasa lebih ringan,
            terstruktur, dan mudah dipantau.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_22px_50px_-34px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(15,23,42,0.32)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-sm font-bold text-blue-600">
                {item.badge}
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
