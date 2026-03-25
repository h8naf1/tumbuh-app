import { Plus } from 'lucide-react'
import { Button } from '../ui/Button.jsx'
import SelectField from '../ui/SelectField.jsx'

function ProductFilterBar({
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  onOpenModal,
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
        </SelectField>

        <Button
          type="button"
          size="lg"
          onClick={onOpenModal}
          className="h-11 rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Button>
      </div>
    </section>
  )
}

export default ProductFilterBar
