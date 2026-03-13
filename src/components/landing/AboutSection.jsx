function AboutSection() {
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
      className="flex min-h-screen scroll-mt-28 items-center bg-white px-6 py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Tentang TUMBUH
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            Dibuat untuk membantu UMKM bekerja lebih rapi dan lebih tenang.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Banyak pemilik usaha kecil masih mencatat penjualan secara manual, memantau
            stok secara terpisah, dan kesulitan membaca perkembangan usaha. TUMBUH hadir
            untuk merangkum proses itu dalam satu pengalaman yang lebih sederhana.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)] ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-sm font-bold text-blue-600">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
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
