import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react'

const categoryVisuals = {
  Coffee: {
    thumbnail: 'CF',
    tone: 'from-orange-200 via-amber-100 to-orange-300',
  },
  Pastry: {
    thumbnail: 'PS',
    tone: 'from-orange-100 via-rose-50 to-amber-200',
  },
  Food: {
    thumbnail: 'FD',
    tone: 'from-emerald-100 via-lime-50 to-emerald-200',
  },
  Drink: {
    thumbnail: 'DR',
    tone: 'from-sky-100 via-cyan-50 to-blue-200',
  },
}

function getStockLabel(stock) {
  if (stock === 0) {
    return { value: '0', suffix: 'x', className: 'text-red-400' }
  }

  if (stock <= 5) {
    return { value: String(stock), suffix: '!', className: 'text-amber-400' }
  }

  return { value: String(stock), suffix: '', className: 'text-slate-100' }
}

function getStatusMeta(stock) {
  if (stock === 0) {
    return {
      label: 'HABIS',
      className: 'bg-red-500/10 text-red-400 ring-red-500/20',
      dotClassName: 'bg-red-400',
    }
  }

  return {
    label: 'TERSEDIA',
    className: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dotClassName: 'bg-emerald-400',
  }
}

function ProductTable({ products, totalProducts, formatRupiah }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.95)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-6 py-5">Produk</th>
              <th className="px-6 py-5">Kategori</th>
              <th className="px-6 py-5">Stok</th>
              <th className="px-6 py-5">Harga</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const stockLabel = getStockLabel(product.stock)
              const statusMeta = getStatusMeta(product.stock)
              const visual =
                categoryVisuals[product.category] ?? categoryVisuals.Coffee

              return (
                <tr
                  key={product.id}
                  className="border-b border-slate-800/90 text-sm text-slate-200 transition hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${visual.tone} text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-inner shadow-white/20`}
                      >
                        <span aria-hidden="true">{visual.thumbnail}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${stockLabel.className}`}>
                      {stockLabel.value}
                      {stockLabel.suffix ? (
                        <span className="ml-1 text-current">{stockLabel.suffix}</span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-100">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusMeta.className}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClassName}`} />
                      {statusMeta.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button
                        type="button"
                        className="rounded-lg p-2 transition hover:bg-slate-800 hover:text-white"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 transition hover:bg-slate-800 hover:text-red-400"
                        aria-label={`Hapus ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-800 bg-slate-800/60 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Menampilkan {products.length} dari {totalProducts} produk</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 text-slate-600"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-blue-500 px-3 font-semibold text-white"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-8 min-w-8 items-center justify-center rounded-xl px-3 font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
          >
            2
          </button>
          <button
            type="button"
            className="flex h-8 min-w-8 items-center justify-center rounded-xl px-3 font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
          >
            3
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductTable
