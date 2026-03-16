function ProblemSection() {
  const problemCards = [
    {
      title: 'Pencatatan masih manual',
      description:
        'Penjualan, stok, dan pemasukan sering dicatat di buku atau diingat sendiri. Cara ini mudah dilakukan di awal, tetapi semakin lama bisa membuat data tercecer dan sulit dicek kembali.',
    },
    {
      title: 'Teknologi terasa rumit',
      description:
        'Banyak pelaku usaha membutuhkan alat bantu, tetapi aplikasi bisnis sering terasa terlalu kompleks. Saat sistem tidak terasa sederhana, pengguna jadi ragu untuk mulai memakai.',
    },
    {
      title: 'Sulit membaca perkembangan usaha',
      description:
        'Usaha tetap berjalan setiap hari, tetapi pemilik usaha belum selalu punya gambaran yang jelas tentang produk yang laris, stok yang perlu diperhatikan, atau arah perkembangan bisnis.',
    },
  ]

  return (
    <section
      id="problem"
      className="relative bg-slate-950 px-6 py-20 scroll-mt-28"
      aria-labelledby="problem-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
            Masalah UMKM
          </p>
          <h2
            id="problem-title"
            className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl"
          >
            Tantangan yang masih sering dihadapi pelaku usaha kecil
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Di Indonesia, jutaan UMKM menopang aktivitas ekonomi harian, tetapi banyak
            yang masih berjalan dalam skala kecil dan mengandalkan cara manual.
            Akibatnya, aktivitas usaha sering terasa sibuk, namun perkembangan bisnis
            belum selalu mudah dipantau.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {problemCards.map((item, index) => (
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

export default ProblemSection
