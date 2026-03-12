function HomeSection() {
  return (
    <section id="home" className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium text-blue-600">Landing Section</p>
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          Solusi digital sederhana untuk UMKM
        </h2>
        <p className="max-w-2xl text-base text-gray-600">
          Ini adalah placeholder untuk hero section. Nanti bisa diisi headline utama,
          deskripsi singkat, dan call to action.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white">
            Mulai
          </button>
          <button className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700">
            Pelajari Lagi
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
