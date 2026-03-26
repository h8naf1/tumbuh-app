import tentangCard01 from '../../assets/elements/tentang/01.svg'
import tentangCard02 from '../../assets/elements/tentang/02.svg'
import tentangCard03 from '../../assets/elements/tentang/03.svg'
import tentangCard04 from '../../assets/elements/tentang/04.svg'

function AboutSection() {
  const targetUsers = [
    {
      title: 'Pemilik Usaha Kecil',
      description:
        'Pelaku UMKM yang ingin mencatat penjualan dan melihat perkembangan usaha mereka dengan lebih mudah.',
      image: tentangCard01,
    },
    {
      title: 'Usaha Rumahan',
      description:
        'Bisnis skala kecil yang membutuhkan cara sederhana untuk mengelola transaksi dan produk.',
      image: tentangCard02,
    },
    {
      title: 'Penjual Makanan dan Minuman',
      description:
        'Pedagang yang melakukan banyak transaksi setiap hari dan membutuhkan pencatatan yang lebih rapi.',
      image: tentangCard03,
    },
    {
      title: 'Pengguna Non-Teknis',
      description:
        'TUMBUH dirancang agar mudah digunakan bahkan bagi pengguna yang tidak terbiasa dengan teknologi.',
      image: tentangCard04,
    },
  ]

  return (
    <section
      id="about"
      className="flex min-h-[76svh] short-screen-safe scroll-mt-28 items-center bg-slate-950 px-5 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
            Tentang TUMBUH
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-[2.65rem]">
            Apa itu TUMBUH<span className="text-[1.50em] leading-none">?</span>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-300 sm:text-base">
            TUMBUH adalah aplikasi yang membantu pelaku UMKM mengelola usaha mereka dengan cara yang lebih sederhana.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-slate-300 sm:text-base">
            Melalui pencatatan penjualan, pengelolaan produk, dan dashboard yang mudah dipahami, TUMBUH membantu pemilik usaha melihat kondisi bisnis mereka dengan lebih jelas.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-slate-300 sm:text-base">
            Tujuannya adalah membantu pelaku usaha kecil mencatat transaksi, memahami perkembangan bisnis, dan mengambil keputusan yang lebih baik untuk usaha mereka.
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
              Untuk Siapa TUMBUH Dibuat
            </p>
            <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-[2.15rem]">
              Dibuat untuk pelaku UMKM
            </h3>
            <p className="mt-5 text-[15px] leading-7 text-slate-300 sm:text-base">
              TUMBUH dirancang untuk pelaku usaha kecil yang ingin mengelola bisnis mereka dengan lebih teratur tanpa perlu menggunakan sistem yang rumit.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {targetUsers.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.55rem] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_18px_40px_-30px_rgba(2,6,23,0.65)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_28px_60px_-34px_rgba(37,99,235,0.22)]"
              >
                <div className="mb-5 overflow-hidden rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-32 w-full object-contain"
                    loading="lazy"
                  />
                </div>
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

          <p className="mt-8 max-w-3xl text-center text-[15px] leading-7 text-slate-300 sm:text-base lg:text-left">
            Dengan pendekatan yang sederhana dan mudah dipahami, TUMBUH membantu pelaku UMKM mengelola usaha mereka dengan lebih teratur.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
