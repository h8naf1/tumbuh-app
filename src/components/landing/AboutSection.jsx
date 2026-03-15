function AboutSection() {
  const targetUsers = [
    {
      title: 'Pemilik Usaha Kecil',
      description:
        'Pelaku UMKM yang ingin mencatat penjualan dan melihat perkembangan usaha mereka dengan lebih mudah.',
    },
    {
      title: 'Usaha Rumahan',
      description:
        'Bisnis skala kecil yang membutuhkan cara sederhana untuk mengelola transaksi dan produk.',
    },
    {
      title: 'Penjual Makanan dan Minuman',
      description:
        'Pedagang yang melakukan banyak transaksi setiap hari dan membutuhkan pencatatan yang lebih rapi.',
    },
    {
      title: 'Pengguna Non-Teknis',
      description:
        'TUMBUH dirancang agar mudah digunakan bahkan bagi pengguna yang tidak terbiasa dengan teknologi.',
    },
  ]

  return (
    <section
      id="about"
      className="flex min-h-screen scroll-mt-28 items-center bg-slate-950 px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
            Tentang TUMBUH
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            Apa itu TUMBUH<span className="text-[1.50em] leading-none">?</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            TUMBUH adalah aplikasi yang membantu pelaku UMKM mengelola usaha mereka dengan cara yang lebih sederhana.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            Melalui pencatatan penjualan, pengelolaan produk, dan dashboard yang mudah dipahami, TUMBUH membantu pemilik usaha melihat kondisi bisnis mereka dengan lebih jelas.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            Tujuannya adalah membantu pelaku usaha kecil mencatat transaksi, memahami perkembangan bisnis, dan mengambil keputusan yang lebih baik untuk usaha mereka.
          </p>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
              Untuk Siapa TUMBUH Dibuat
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl">
              Dibuat untuk pelaku UMKM
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              TUMBUH dirancang untuk pelaku usaha kecil yang ingin mengelola bisnis mereka dengan lebih teratur tanpa perlu menggunakan sistem yang rumit.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {targetUsers.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_40px_-30px_rgba(2,6,23,0.65)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_28px_60px_-34px_rgba(37,99,235,0.22)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-sm font-bold text-blue-300">
                  0{index + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-center text-base leading-8 text-slate-300 sm:text-lg lg:text-left">
            Dengan pendekatan yang sederhana dan mudah dipahami, TUMBUH membantu pelaku UMKM mengelola usaha mereka dengan lebih teratur.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
