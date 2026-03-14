import { useState } from 'react'

function AboutSection() {
  const problems = [
    {
      id: 'manual',
      title: 'Catatan masih manual',
      description:
        'Penjualan yang ditulis di buku atau spreadsheet sering tercecer, salah hitung, dan bikin rekap harian makan waktu.',
      detail: 'Omzet harian jadi sulit dipantau dengan cepat.',
      impact: 'Pemilik usaha harus cek ulang data satu per satu saat toko sedang ramai.',
      stat: 'Rekap jadi lebih lambat',
      imageLabel: 'Catatan penjualan harian',
      imageCaption: 'Preview visual untuk alur pencatatan transaksi yang masih manual.',
    },
    {
      id: 'inventory',
      title: 'Stok tidak selalu jelas',
      description:
        'Barang bisa tiba-tiba habis atau malah menumpuk karena stok tidak diperbarui secara rutin setelah transaksi berjalan.',
      detail: 'Akhirnya, pelanggan kecewa atau modal tertahan.',
      impact: 'Keputusan belanja stok jadi tidak akurat dan sulit diprediksi.',
      stat: 'Risiko stok kosong meningkat',
      imageLabel: 'Monitoring stok produk',
      imageCaption: 'Preview visual untuk kondisi stok yang belum terpantau dengan rapi.',
    },
    {
      id: 'insight',
      title: 'Bisnis jalan, tapi datanya belum terbaca',
      description:
        'Banyak pelaku usaha sudah berjualan setiap hari, tapi belum punya gambaran produk laris, jam ramai, atau arah pertumbuhan usaha.',
      detail: 'Keputusan jadi lebih sering berdasarkan perkiraan.',
      impact: 'Potensi promosi dan pengembangan usaha sering terlewat karena datanya belum rapi.',
      stat: 'Sulit melihat arah usaha',
      imageLabel: 'Ringkasan performa usaha',
      imageCaption: 'Preview visual untuk data usaha yang belum mudah dibaca.',
    },
  ]

  const [activeProblem, setActiveProblem] = useState(problems[0])

  return (
    <section id="about" className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Mengapa TUMBUH hadir
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Banyak UMKM masih sibuk mengurus hal kecil yang berulang setiap hari
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            TUMBUH dirancang untuk membantu pemilik usaha mencatat penjualan,
            melihat kondisi bisnis, dan mengelola operasional harian dengan cara
            yang lebih rapi dan mudah dipahami.
  const highlights = [
    {
      title: 'Lebih mudah dipakai',
      description:
        'TUMBUH dirancang untuk pemilik usaha kecil yang ingin sistem sederhana tanpa perlu belajar tools yang rumit.',
    },
    {
      title: 'Fokus ke kebutuhan UMKM',
      description:
        'Mulai dari catat transaksi, cek stok, sampai lihat perkembangan usaha, semuanya disusun sesuai alur kerja harian UMKM.',
    },
    {
      title: 'Insight yang jelas',
      description:
        'Data usaha ditampilkan dalam bentuk yang mudah dipahami agar pemilik usaha bisa lebih cepat mengambil keputusan.',
    },
  ]

  return (
    <section
      id="about"
      className="flex min-h-screen scroll-mt-28 items-center bg-slate-950 px-6 py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Tentang TUMBUH
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            Dibuat untuk membantu UMKM bekerja lebih rapi dan lebih tenang.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Banyak pemilik usaha kecil masih mencatat penjualan secara manual, memantau
            stok secara terpisah, dan kesulitan membaca perkembangan usaha. TUMBUH hadir
            untuk merangkum proses itu dalam satu pengalaman yang lebih sederhana.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Pilih salah satu kartu untuk melihat tantangan yang paling sering dialami UMKM.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem, index) => {
            const isActive = activeProblem.id === problem.id

            return (
              <button
                key={problem.id}
                type="button"
                onClick={() => setActiveProblem(problem)}
                onMouseEnter={() => setActiveProblem(problem)}
                className={`group flex h-full flex-col rounded-[2rem] border p-4 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:p-5 ${
                  isActive
                    ? 'border-blue-200 bg-white shadow-[0_26px_56px_-30px_rgba(37,99,235,0.35)]'
                    : 'border-slate-200 bg-slate-50/80 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_26px_56px_-30px_rgba(15,23,42,0.28)]'
                }`}
                aria-pressed={isActive}
              >
                <div className="relative overflow-hidden rounded-[1.6rem] border-[6px] border-white bg-slate-950 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.55)]">
                  <div className="aspect-[4/3] bg-[radial-gradient(circle_at_center,rgba(120,255,235,0.22),rgba(7,17,24,0.96)_58%,rgba(2,6,23,1)_100%)]">
                    <div className="absolute inset-0 opacity-80">
                      <div className="absolute inset-x-[18%] bottom-[22%] h-[20%] rounded-sm bg-[linear-gradient(180deg,rgba(163,230,255,0.24),rgba(15,23,42,0.35))] shadow-[0_18px_30px_-20px_rgba(125,211,252,0.45)]" />
                      <div className="absolute inset-x-[28%] bottom-[32%] top-[30%] rounded-xl border border-cyan-100/15 bg-cyan-50/5 backdrop-blur-[1px]" />
                      <div className="absolute left-1/2 top-[32%] h-px w-14 -translate-x-1/2 bg-cyan-100/80 shadow-[0_0_18px_rgba(165,243,252,0.85)]" />
                      <div className="absolute inset-x-[31%] top-[40%] space-y-3 opacity-80">
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                        <div className="h-px bg-white/10" />
                      </div>
                      <div className="absolute inset-x-[34%] bottom-[36%] flex items-end gap-3">
                        <div className="h-16 w-3 rounded-t bg-cyan-100/45" />
                        <div className="h-8 w-3 rounded-t bg-cyan-100/30" />
                        <div className="h-12 w-3 rounded-t bg-cyan-100/40" />
                        <div className="h-7 w-3 rounded-t bg-cyan-100/30" />
                        <div className="h-10 w-3 rounded-t bg-cyan-100/35" />
                        <div className="h-14 w-3 rounded-t bg-cyan-100/45" />
                      </div>
                    </div>

                    <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                      <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-50/80 backdrop-blur">
                        Preview
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/60">
                        Asset image
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/80">
                        {problem.imageLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="px-2 pt-4 text-sm leading-6 text-slate-500">
                  {problem.imageCaption}
                </p>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <h3 className="text-xl font-bold leading-7 text-slate-900">
                    {problem.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {problem.description}
                  </p>
                  <p className="mt-4 text-sm font-medium leading-6 text-slate-500">
                    {problem.detail}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                    <span>{isActive ? 'Sedang dipilih' : 'Lihat detail'}</span>
                    <span
                      className={`transition ${
                        isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`}
                    >
                      &rarr;
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#eef4ff_100%)] p-6 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.28)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Fokus masalah
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {activeProblem.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {activeProblem.impact}
              </p>
            </div>

            <div className="min-w-[220px] rounded-2xl border border-white/80 bg-white/80 p-5 backdrop-blur">
              <p className="text-sm text-slate-500">Dampak yang sering terasa</p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {activeProblem.stat}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                TUMBUH membantu merapikan proses harian agar pemilik usaha bisa lebih fokus ke penjualan dan perkembangan bisnis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-[0_18px_40px_-30px_rgba(2,6,23,0.65)] ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-sm font-bold text-blue-600">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
