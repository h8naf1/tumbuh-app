const categoryMeta = {
  'Masalah Transaksi': { color: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
  'Produk / Stok': { color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
  'Asisten Chat': { color: 'text-sky-300 bg-sky-500/10 border-sky-500/20' },
  'Pembayaran / Paket': { color: 'text-violet-300 bg-violet-500/10 border-violet-500/20' },
  'Bug / Error Sistem': { color: 'text-rose-300 bg-rose-500/10 border-rose-500/20' },
  'Lainnya': { color: 'text-slate-300 bg-slate-500/10 border-slate-500/20' },
}

function HelpCategoryBadge({ category }) {
  const meta = categoryMeta[category] ?? categoryMeta['Lainnya']

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${meta.color}`}
    >
      {category}
    </span>
  )
}

export default HelpCategoryBadge
