import MagicBento from '../MagicBento'
import assistenChatImg from '../../assets/elements/assistenchat.png'
import transaksiImg from '../../assets/elements/transaksi.png'
import daftarProdukImg from '../../assets/elements/daftarproduk.png'
import dashboardPageImg from '../../assets/elements/Dashboardpage.png'

function FeaturesSection() {
  const featureCards = [
    {
      title: 'Asisten Chat untuk operasional harian',
      description:
        'Gunakan AI chat untuk membantu mencatat penjualan, menyiapkan draft transaksi, dan memandu pekerjaan usaha sehari-hari dengan bahasa yang natural.',
      badge: '01',
      image: assistenChatImg,
      imageAlt: 'Tampilan asisten chat TUMBUH',
      imageClassName: 'right-[-5%] top-[-8%] w-[460px]',
    },
    {
      title: 'Scan barcode dan pilih produk lebih cepat',
      description:
        'Produk bisa dicatat lebih praktis lewat alur scan barcode atau input cepat, sehingga proses transaksi tidak perlu selalu dilakukan secara manual.',
      badge: '02',
      image: transaksiImg,
      imageAlt: 'Tampilan halaman transaksi TUMBUH',
      imageClassName: 'absolute inset-0 w-full h-full object-cover object-top',
    },
    {
      title: 'Upload nota untuk bantu pencatatan stok',
      description:
        'Nota belanja bisa diunggah ke asisten agar sistem membantu membaca isi dokumen dan menyiapkan draft data yang tetap bisa dikonfirmasi pengguna.',
      badge: '03',
      image: daftarProdukImg,
      imageAlt: 'Tampilan daftar produk TUMBUH',
      imageClassName: 'right-[-5%] top-[-8%] w-[420px]',
    },
    {
      title: 'Dashboard insight dan laporan PDF',
      description:
        'Pantau penjualan, stok, dan transaksi dari satu dashboard, lalu unduh laporan agar ringkasan usaha lebih mudah dibagikan atau dicek kembali.',
      badge: '04',
      image: dashboardPageImg,
      imageAlt: 'Tampilan dashboard TUMBUH',
      imageClassName: 'right-[-8%] top-[-6%] w-[420px]',
    },
  ]

  return (
    <section
      id="features"
      className="relative scroll-mt-28 bg-slate-900 px-5 py-18 sm:px-6 sm:py-22"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-10 max-w-3xl text-center lg:mb-12 lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
            Fitur Inti TUMBUH
          </p>
          <h2 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-[2.65rem]">
            Semua fitur penting usaha Anda dirancang agar terasa praktis sejak hari pertama.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">
            TUMBUH tidak hanya membantu mencatat data, tetapi juga mempermudah alur kerja harian pelaku UMKM melalui chat, scan, upload nota, dan dashboard yang mudah dibaca.
          </p>
        </div>

        <MagicBento items={featureCards} textAutoHide={false} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300 lg:justify-start">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Mudah digunakan oleh pengguna non-teknis
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Cocok untuk operasional UMKM sehari-hari
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            Fokus pada alur kerja yang lebih ringan dan rapi
          </span>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
