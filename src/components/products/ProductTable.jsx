import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import {
  getProductStockLabel,
  getProductStockStatus,
} from '../../lib/productHelpers.js'

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

function ProductTable({
  products,
  totalProducts,
  formatRupiah,
  currentPage,
  totalPages,
  onPageChange,
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <section className="overflow-hidden rounded-[1.6rem] border border-slate-800 bg-slate-900 shadow-[0_24px_45px_-28px_rgba(15,23,42,0.95)]">
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-5 py-4">Produk</th>
              <th className="px-5 py-4">Kategori</th>
              <th className="px-5 py-4">Stok</th>
              <th className="px-5 py-4">Harga</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const stockLabel = getProductStockLabel(product.stock)
              const statusMeta = getProductStockStatus(product.stock)
              const visual =
                categoryVisuals[product.category] ?? categoryVisuals.Coffee

              return (
                <tr
                  key={product.id}
                  className="border-b border-slate-800/90 text-sm text-slate-200 transition hover:bg-slate-800/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        label={visual.thumbnail}
                        tone={visual.tone}
                        className="w-10"
                        roundedClassName="rounded-xl"
                      />
                      <div>
                        <p className="font-semibold text-white">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{product.category}</td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${stockLabel.className}`}>
                      {stockLabel.value}
                      {stockLabel.suffix ? (
                        <span className="ml-1 text-current">{stockLabel.suffix}</span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-100">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusMeta.className}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClassName}`} />
                      {statusMeta.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => onEditProduct?.(product)}
                        className="rounded-lg p-2 transition hover:bg-slate-800 hover:text-white"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct?.(product)}
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

      <div className="flex flex-col gap-4 border-t border-slate-800 bg-slate-800/60 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Menampilkan {products.length} dari {totalProducts} produk</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 text-slate-600"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-blue-500 px-3 font-semibold text-white"
          >
            {currentPage}
          </button>
          <span className="px-1 text-xs font-medium text-slate-500">
            dari {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
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
