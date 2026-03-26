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
  selectedProductIds = [],
  onToggleProductSelection,
  onToggleSelectAll,
}) {
  const selectedIdSet = new Set(selectedProductIds)
  const allSelectedOnPage = products.length > 0 && products.every((product) => selectedIdSet.has(product.id))
  const someSelectedOnPage = products.some((product) => selectedIdSet.has(product.id))

  return (
    <section className="overflow-hidden rounded-[1.6rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_24px_45px_-28px_rgba(15,23,42,0.18)] transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full text-left">
          <thead>
            <tr className="border-b border-[var(--app-border)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-text-muted)]">
              <th className="px-5 py-4">
                <label className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={allSelectedOnPage}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = !allSelectedOnPage && someSelectedOnPage
                      }
                    }}
                    onChange={() => onToggleSelectAll?.(products, !allSelectedOnPage)}
                    className="h-4 w-4 rounded border-[var(--app-border)] bg-[var(--app-surface)] text-blue-500 focus:ring-blue-500/20"
                    aria-label="Pilih semua produk di halaman ini"
                  />
                </label>
              </th>
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
              const isSelected = selectedIdSet.has(product.id)

              return (
                <tr
                  key={product.id}
                  className={`border-b border-[var(--app-border)] text-sm text-[var(--app-text)] transition hover:bg-[var(--app-surface)] ${
                    isSelected ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <td className="px-5 py-4">
                    <label className="inline-flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleProductSelection?.(product.id)}
                        className="h-4 w-4 rounded border-[var(--app-border)] bg-[var(--app-surface)] text-blue-500 focus:ring-blue-500/20"
                        aria-label={`Pilih ${product.name}`}
                      />
                    </label>
                  </td>
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
                        <p className="font-semibold text-[var(--app-text)]">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--app-text-soft)]">{product.category}</td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${stockLabel.className}`}>
                      {stockLabel.value}
                      {stockLabel.suffix ? (
                        <span className="ml-1 text-current">{stockLabel.suffix}</span>
                      ) : null}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-[var(--app-text)]">
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
                    <div className="flex items-center justify-end gap-2 text-[var(--app-text-soft)]">
                      <button
                        type="button"
                        onClick={() => onEditProduct?.(product)}
                        className="rounded-lg p-2 transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct?.(product)}
                        className="rounded-lg p-2 transition hover:bg-[var(--app-surface)] hover:text-red-400"
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

      <div className="flex flex-col gap-4 border-t border-[var(--app-border)] bg-[color:color-mix(in_srgb,var(--app-surface)_70%,transparent)] px-5 py-4 text-sm text-[var(--app-text-soft)] sm:flex-row sm:items-center sm:justify-between">
        <p>Menampilkan {products.length} dari {totalProducts} produk</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--app-border)] text-[var(--app-text-muted)]"
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
          <span className="px-1 text-xs font-medium text-[var(--app-text-muted)]">
            dari {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--app-border)] text-[var(--app-text-muted)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
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
