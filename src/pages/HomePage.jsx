import MainNavbar from '../components/landing/MainNavbar.jsx'

function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <MainNavbar />

      <section id="home" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium text-blue-600">Landing Page</p>
          <h2 className="mb-4 text-4xl font-bold">SaleAI untuk UMKM</h2>
          <p className="max-w-2xl text-gray-600">
            Ini masih versi awal landing page. Tujuannya supaya project sudah punya
            halaman utama yang bisa kamu lihat dan kembangkan sedikit demi sedikit.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white">
              Coba Sekarang
            </button>
            <button className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700">
              Pelajari Dulu
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">About</h2>
          <p className="max-w-3xl text-gray-600">
            Section ini nanti bisa menjelaskan apa itu SaleAI, masalah yang ingin
            diselesaikan, dan kenapa solusi ini relevan untuk UMKM.
          </p>
        </div>
      </section>

      <section id="features" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold">Features</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold">Feature 1</h3>
              <p className="text-sm text-gray-600">Placeholder fitur pertama.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold">Feature 2</h3>
              <p className="text-sm text-gray-600">Placeholder fitur kedua.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold">Feature 3</h3>
              <p className="text-sm text-gray-600">Placeholder fitur ketiga.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-bold">Contact</h2>
          <p className="text-gray-600">Placeholder contact section.</p>
        </div>
      </section>
    </main>
  )
}

export default HomePage
