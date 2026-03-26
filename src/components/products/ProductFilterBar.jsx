import {
  ChevronDown,
  Plus,
  Trash2,
} from 'lucide-react'

function ProductFilterBar({
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  onOpenModal,
  selectedCount = 0,
  onDeleteSelected,
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SelectField
          label="Kategori"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          wrapperClassName="w-full max-w-sm"
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {selectedCount > 0 ? (
          <button
            type="button"
            onClick={onDeleteSelected}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
          >
            <Trash2 className="h-4 w-4" />
            Hapus {selectedCount} Produk
          </button>
        ) : null}

        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(59,130,246,0.95)] transition hover:bg-blue-400"
        >
          <Plus className="h-4 w-4" />
          Tambah Produk
        </button>
      </div>
    </section>
  )
}

export default ProductFilterBar
