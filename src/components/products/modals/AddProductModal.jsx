import {
  ChevronDown,
  CloudUpload,
  Save,
  X,
} from 'lucide-react'

function AddProductHeaderIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-[1.35rem] bg-blue-500 shadow-[0_18px_35px_-22px_rgba(59,130,246,0.55)]">
      <div className="flex h-7 w-7 items-center justify-center rounded-[0.55rem] bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 text-blue-500"
          aria-hidden="true"
        >
          <path
            d="M8 3.5v9M3.5 8h9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Tambah Produk Baru',
  submitLabel = 'Simpan Produk',
  formData,
  onFormInputChange,
  onPriceChange,
  onImageChange,
  selectedImageName,
  categoryOptions,
  formatPriceInput,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm md:p-8">
      <div className="flex max-h-[calc(100svh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-2xl shadow-black/20 transition-colors duration-300 md:max-h-[calc(100svh-4rem)]">
        <header className="flex shrink-0 items-center justify-between border-b border-[var(--app-border)] px-6 py-4">
          <div className="flex items-center gap-3">
            <AddProductHeaderIcon />
            <h2 className="text-xl font-bold tracking-tight text-[var(--app-text)]">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--app-text-muted)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
            aria-label="Tutup formulir"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6 pb-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--app-text-soft)]">
                  Foto Produk
                </label>
                <div className="group relative">
                  <div className="cursor-pointer rounded-2xl border-2 border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-8 transition-all group-hover:border-blue-500">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                        <CloudUpload className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-medium text-[var(--app-text)]">
                        Klik untuk upload atau drag and drop
                      </p>
                      <p className="mt-1 text-xs text-[var(--app-text-muted)]">
                        PNG, JPG atau WebP maksimal 5MB
                      </p>
                      {selectedImageName ? (
                        <p className="mt-3 text-xs font-medium text-blue-500">
                          {selectedImageName}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={onImageChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="product-name"
                    className="text-sm font-semibold text-[var(--app-text-soft)]"
                  >
                    Nama Produk
                  </label>
                  <input
                    id="product-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Contoh: Latte Signature"
                    value={formData.name}
                    onChange={onFormInputChange}
                    className="h-12 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-text-muted)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-[var(--app-text-soft)]"
                  >
                    Kategori
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={onFormInputChange}
                      className="h-12 w-full appearance-none rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 pr-12 text-[var(--app-text)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="" disabled>
                        Pilih Kategori
                      </option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-text-muted)]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-semibold text-[var(--app-text-soft)]">
                    Stok Awal
                  </label>
                  <div className="relative">
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      value={formData.stock}
                      onChange={onFormInputChange}
                      className="h-12 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 pr-16 text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-text-muted)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[var(--app-text-muted)]">
                      Unit
                    </span>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="price" className="text-sm font-semibold text-[var(--app-text-soft)]">
                    Harga
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-semibold text-[var(--app-text-soft)]">
                      Rp
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="0"
                      value={formData.price ? formatPriceInput(formData.price) : ''}
                      onChange={onPriceChange}
                      className="h-12 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] pl-12 pr-4 text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-text-muted)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-[var(--app-text-soft)]"
                  >
                    Deskripsi Produk
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Ceritakan sedikit tentang produk Anda..."
                    value={formData.description}
                    onChange={onFormInputChange}
                    className="w-full resize-none rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-text-muted)] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-[var(--app-border)] bg-[var(--app-surface-strong)] px-6 py-4">
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center rounded-xl px-6 font-semibold text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 font-semibold text-white shadow-[0_20px_40px_-24px_rgba(59,130,246,0.55)] transition hover:bg-blue-400"
              >
                <Save className="h-4 w-4" />
                {submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
