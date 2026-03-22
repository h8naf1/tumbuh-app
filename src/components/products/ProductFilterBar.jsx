import {
  ChevronDown,
  Plus,
} from 'lucide-react'

function ProductFilterBar({
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  onOpenModal,
}) {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-sm">
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-2xl border border-slate-800 bg-slate-900 px-4 pr-12 text-sm font-medium text-slate-200 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="all">Semua Kategori</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>

      <button
        type="button"
        onClick={onOpenModal}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(59,130,246,0.95)] transition hover:bg-blue-400"
      >
        <Plus className="h-4 w-4" />
        Tambah Produk
      </button>
    </section>
  )
}

export default ProductFilterBar
