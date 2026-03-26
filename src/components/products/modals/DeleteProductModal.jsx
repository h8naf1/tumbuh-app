import { AlertTriangle, Trash2, X } from 'lucide-react'

function DeleteProductModal({ products = [], onClose, onConfirm }) {
  if (!products.length) {
    return null
  }

  const isBulkDelete = products.length > 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.75rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] shadow-[0_30px_80px_-34px_rgba(2,6,23,0.25)] transition-colors duration-300">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--app-border)] px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/12 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                Konfirmasi Hapus
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--app-text)]">
                {isBulkDelete ? 'Hapus Beberapa Produk' : 'Hapus Produk'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--app-text-soft)]">
                {isBulkDelete ? (
                  <>
                    Sebanyak <span className="font-semibold text-[var(--app-text)]">{products.length} produk</span> akan dihapus dari daftar produk.
                    Tindakan ini tidak bisa dibatalkan.
                  </>
                ) : (
                  <>
                    Produk <span className="font-semibold text-[var(--app-text)]">{products[0].name}</span> akan dihapus dari daftar produk.
                    Tindakan ini tidak bisa dibatalkan.
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-soft)] transition hover:text-[var(--app-text)]"
            aria-label="Tutup konfirmasi hapus"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4">
            <p className="text-xs uppercase tracking-wide text-[var(--app-text-muted)]">
              Produk terpilih
            </p>
            <div className="mt-3 space-y-2">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 rounded-xl bg-[var(--app-surface-strong)] px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--app-text)]">{product.name}</p>
                    <p className="truncate text-xs text-[var(--app-text-soft)]">{product.category}</p>
                  </div>
                </div>
              ))}
              {products.length > 4 ? (
                <p className="pt-1 text-xs text-[var(--app-text-muted)]">
                  dan {products.length - 4} produk lainnya
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[var(--app-border)] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-[var(--app-text-soft)] transition hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.(products)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-22px_rgba(239,68,68,0.55)] transition hover:bg-red-400"
          >
            <Trash2 className="h-4 w-4" />
            {isBulkDelete ? `Hapus ${products.length} Produk` : 'Hapus Produk'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProductModal
