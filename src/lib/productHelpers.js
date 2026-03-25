// Threshold stok minimum untuk penanda perhatian.
export const LOW_STOCK_THRESHOLD = 5

// Helper label angka stok agar tampilan tetap konsisten lintas komponen.
export function getProductStockLabel(stock) {
  if (stock === 0) {
    return { value: '0', suffix: 'x', className: 'text-red-400' }
  }

  if (stock <= LOW_STOCK_THRESHOLD) {
    return { value: String(stock), suffix: '!', className: 'text-amber-400' }
  }

  return { value: String(stock), suffix: '', className: 'text-slate-100' }
}

// Helper badge status stok untuk dipakai di tabel, card, atau detail produk.
export function getProductStockStatus(stock) {
  if (stock === 0) {
    return {
      label: 'HABIS',
      className: 'bg-red-500/10 text-red-400 ring-red-500/20',
      dotClassName: 'bg-red-400',
      tone: 'danger',
    }
  }

  if (stock <= LOW_STOCK_THRESHOLD) {
    return {
      label: 'MENIPIS',
      className: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
      dotClassName: 'bg-amber-400',
      tone: 'warning',
    }
  }

  return {
    label: 'TERSEDIA',
    className: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dotClassName: 'bg-emerald-400',
    tone: 'success',
  }
}

// Helper utilitas untuk menghitung jumlah produk yang stoknya perlu diperhatikan.
export function isLowStockProduct(stock) {
  return stock > 0 && stock <= LOW_STOCK_THRESHOLD
}
