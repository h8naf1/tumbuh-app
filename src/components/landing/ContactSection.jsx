function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-screen scroll-mt-28 items-center bg-slate-900 px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.35),rgba(15,23,42,0.98)_58%)] px-6 py-10 shadow-[0_32px_80px_-36px_rgba(2,6,23,0.8)] sm:px-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                Hubungi Kami
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                Siap membantu UMKM tumbuh lebih rapi dan lebih percaya diri.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                Jika kamu ingin melihat demo, berdiskusi soal kebutuhan UMKM, atau
                menjajaki kolaborasi, tim TUMBUH siap terhubung.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                  Email
                </p>
                <p className="mt-2 text-sm font-medium text-white sm:text-base">
                  halo@tumbuh.id
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                  Telepon
                </p>
                <p className="mt-2 text-sm font-medium text-white sm:text-base">
                  +62 812-3456-7890
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
                  Lokasi
                </p>
                <p className="mt-2 text-sm font-medium text-white sm:text-base">
                  Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
