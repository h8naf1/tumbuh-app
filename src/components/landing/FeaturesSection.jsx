function FeaturesSection() {
  return (
    <section
      id="features"
      className="flex min-h-screen scroll-mt-28 items-center bg-gray-50 px-6 py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-medium text-blue-600">Fitur</p>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Fitur utama akan ditampilkan di sini
          </h2>
          <p className="text-base text-gray-600">
            Contoh daftar fitur. Nanti bisa diganti dengan data atau kartu
            fitur yang lebih lengkap.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Fitur Pertama</h3>
            <p className="text-sm text-gray-600">Deskripsi singkat fitur pertama.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Fitur Kedua</h3>
            <p className="text-sm text-gray-600">Deskripsi singkat fitur kedua.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Fitur Ketiga</h3>
            <p className="text-sm text-gray-600">Deskripsi singkat fitur ketiga.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
