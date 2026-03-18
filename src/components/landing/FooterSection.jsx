const menuItems = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Fitur', href: '#features' },
  { label: 'Preview', href: '#dashboard' },
  { label: 'Kontak', href: '#contact' },
]

const companyItems = [
  'Tentang TUMBUH',
  'Demo Produk',
  'Kebijakan Privasi',
  'Syarat Layanan',
]

const contactItems = [
  { label: 'Email', value: 'halo@tumbuh.id' },
  { label: 'Telepon', value: '+62 812-3456-7890' },
  { label: 'Lokasi', value: 'Yogyakarta, Indonesia' },
]

function FooterSection() {
  return (
    <footer className="bg-slate-900 px-6 pb-12 pt-20 sm:pt-24 lg:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 pb-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)_minmax(220px,0.95fr)] lg:gap-8">
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1e293b_0%,#2563eb_100%)] text-sm font-black tracking-[0.16em] text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.8)]">
                T
              </div>
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-white">TUMBUH</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Asisten Penjualan AI Untuk UMKM
                </p>
              </div>
            </a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
              Cara paling praktis bagi UMKM untuk mencatat penjualan, memantau stok,
              dan mengambil keputusan usaha dengan bantuan AI.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">
              Menu
            </h3>
            <div className="mt-6 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">
              Company
            </h3>
            <div className="mt-6 space-y-3">
              {companyItems.map((item) => (
                <p key={item} className="text-sm text-slate-400">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">
              Kontak Kami
            </h3>
            <div className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-200">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white sm:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 border-t border-slate-800/90">
        <div className="flex w-full flex-col gap-3 px-6 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p className="text-left">(c) 2026 TUMBUH. Seluruh hak cipta dilindungi.</p>
          <p className="text-left sm:ml-auto sm:text-right">Dibangun untuk membantu UMKM berkembang lebih terarah.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection

