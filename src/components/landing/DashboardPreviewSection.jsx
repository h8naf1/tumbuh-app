import { Download, Package, ReceiptText } from 'lucide-react'

function DashboardPreviewSection() {
  const metrics = [
    {
      label: 'Transaksi hari ini',
      value: '128',
      detail: 'Tercatat lebih rapi',
      tone: 'from-sky-500 to-blue-600',
      icon: ReceiptText,
    },
    {
      label: 'Produk aktif',
      value: '42',
      detail: 'Stok dan katalog terpantau',
      tone: 'from-cyan-400 to-sky-500',
      icon: Package,
    },
    {
      label: 'Laporan siap unduh',
      value: 'PDF',
      detail: 'Mudah dibagikan dan dicek',
      tone: 'from-blue-500 to-indigo-600',
      icon: Download,
    },
  ]

  return (
    <section
      id="dashboard"
      className="relative scroll-mt-28 bg-slate-950 px-5 py-18 sm:px-6 sm:py-22"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/70 to-transparent" />
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[0.84fr_1fr] xl:gap-14">
        <div className="max-w-xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
            Preview Dashboard
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-[2.65rem]">
            Semua kondisi usaha bisa dipantau dari satu tampilan yang terasa familiar.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-300 sm:text-base">
            Dashboard TUMBUH dirancang untuk membantu pemilik UMKM membaca penjualan, melihat kondisi produk, dan menangkap insight penting tanpa harus membuka banyak alur kerja yang membingungkan.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {metrics.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left shadow-[0_18px_40px_-30px_rgba(2,6,23,0.65)]"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[540px]">
          <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[1.9rem] border border-slate-800 bg-[linear-gradient(160deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.98)_100%)] p-3 shadow-[0_30px_80px_-30px_rgba(2,6,23,0.75)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-36px_rgba(37,99,235,0.25)]">
            <div className="rounded-[1.7rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),rgba(2,6,23,0.98)_58%)] p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Dashboard TUMBUH
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    Ringkasan usaha harian
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sky-300">
                  Aktif
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm text-slate-300">Penjualan hari ini</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <p className="text-2xl font-bold text-white">Rp 2.450.000</p>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      +18%
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-sm text-slate-300">Produk perlu dipantau</p>
                    <p className="mt-2 text-lg font-semibold text-white">6 item stok menipis</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-sm text-slate-300">Transaksi terbaru</p>
                    <p className="mt-2 text-lg font-semibold text-white">QRIS & tunai tercatat</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4 text-white/90">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">
                    Insight AI
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sky-50">
                    Penjualan minuman dingin meningkat pada jam siang. Siapkan stok lebih awal dan gunakan Asisten Chat untuk bantu memeriksa produk yang perlu di-restock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPreviewSection
