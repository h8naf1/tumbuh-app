import MagicBento from '../MagicBento'

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
      className="relative flex min-h-[76svh] short-screen-safe scroll-mt-28 items-center bg-slate-900 px-5 py-16 sm:px-6 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Fitur Utama
          </p>
          <h2 className="max-w-2xl text-3xl font-black leading-tight text-white sm:text-[2.65rem]">
            Fitur yang membantu pemilik UMKM bekerja lebih praktis.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">
            Fokus utama TUMBUH adalah membantu proses harian usaha terasa lebih ringan,
            terstruktur, dan mudah dipantau.
          </p>
        </div>

        <MagicBento items={featureCards} textAutoHide={false} />
      </div>
    </section>
  )
}

export default FeaturesSection






