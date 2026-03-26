import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

const menuItems = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Fitur', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Kontak', href: '#contact' },
]

const contactItems = [
  {
    label: 'EMAIL',
    value: 'iamheroes276@gmail.com',
    href: 'mailto:iamheroes276@gmail.com',
    icon: Mail,
  },
  {
    label: 'TELEPON',
    value: '082133306042',
    href: 'https://wa.me/6282133306042',
    icon: Phone,
    isExternal: true,
  },
  {
    label: 'LOKASI',
    value: 'Klaten, Jawa Tengah, Indonesia',
    href: 'https://www.google.com/maps/search/?api=1&query=Klaten,Jawa%20Tengah,Indonesia',
    icon: MapPin,
    isExternal: true,
  },
]

function ContactItem({ icon: Icon, label, value, href, isExternal = false }) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className="group flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.72)_100%)] px-4 py-3.5 transition duration-200 hover:border-blue-400/30 hover:bg-[linear-gradient(180deg,rgba(30,41,59,0.96)_0%,rgba(15,23,42,0.92)_100%)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 transition duration-200 group-hover:border-blue-400/25 group-hover:text-slate-100">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 transition duration-200 group-hover:text-slate-300">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-slate-100 sm:text-[15px]">
          {value}
        </p>
      </div>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-200" />
    </a>
  )
}

function FooterSection() {
  return (
    <footer className="bg-slate-900 px-5 pb-12 pt-16 sm:px-6 sm:pt-20 lg:pt-20">
      <div className="mx-auto max-w-280">
        <div className="grid gap-8 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(180px,0.8fr)_minmax(260px,1fr)] lg:gap-8">
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

          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">
              Kontak Kami
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Hubungi tim TUMBUH melalui kanal yang paling nyaman untuk bisnis Anda.
            </p>
            <div className="mt-6 space-y-3">
              {contactItems.map((item) => (
                <ContactItem key={item.label} {...item} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 border-t border-slate-800/90">
        <div className="w-full px-6 pt-6 text-center text-xs text-slate-400">
          <p>(c) 2026 TUMBUH. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
