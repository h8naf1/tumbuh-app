function SolutionSection() {
  const solutionCards = [
    {
      title: 'Catatan usaha lebih rapi',
      description:
        'TUMBUH membantu mencatat penjualan dan produk dalam satu tempat, sehingga informasi usaha tidak tersebar dan lebih mudah dilihat kembali saat dibutuhkan.',
    },
    {
      title: 'Tampilan dibuat sederhana',
      description:
        'Alur dan tampilan dirancang agar mudah dipahami oleh pengguna non-teknis. Fokusnya adalah membantu pelaku usaha mulai dari hal yang paling penting, tanpa proses yang membingungkan.',
    },
    {
      title: 'Perkembangan usaha lebih mudah dipahami',
      description:
        'Melalui ringkasan yang jelas, TUMBUH membantu pemilik usaha melihat aktivitas penjualan, kondisi stok, dan gambaran perkembangan bisnis secara lebih praktis.',
    },
  ]

  return (
    <section
      id="solution"
      className="relative bg-slate-950 px-6 py-20 scroll-mt-28"
      aria-labelledby="solution-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
            Solusi TUMBUH
          </p>
          <h2
            id="solution-title"
            className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl"
          >
            TUMBUH membantu usaha harian terasa lebih teratur
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            TUMBUH dirancang untuk membantu pelaku UMKM mengelola aktivitas penting
            dalam satu alur yang sederhana. Bukan untuk membuat proses jadi rumit,
            tetapi untuk membantu pencatatan, pemantauan, dan pembacaan kondisi usaha
            terasa lebih mudah.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionCards.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_40px_-30px_rgba(2,6,23,0.65)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_28px_60px_-34px_rgba(37,99,235,0.22)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-sm font-bold text-blue-300">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
