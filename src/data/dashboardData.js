export const dashboardSidebarItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'products', label: 'Produk', href: '/produk' },
  { id: 'transactions', label: 'Transaksi', href: '/transaksi' },
  { id: 'chat-assistant', label: 'Asisten Chat', href: '/asisten-chat' },
  { id: 'settings', label: 'Pengaturan', href: '/pengaturan', isSeparated: true },
]

export const dashboardUserProfile = {
  name: 'Admin Tumbuh',
  role: 'admin@tumbuh.id',
  avatar: '',
}

export const dashboardSummaryCards = [
  {
    id: 'total-sales',
    title: 'Total Penjualan',
    value: 'Rp 12.500.000',
    trend: '+5.2% bulan ini',
  },
  {
    id: 'total-transactions',
    title: 'Jumlah Transaksi',
    value: '450',
    trend: '+3.1% bulan ini',
  },
  {
    id: 'products-sold',
    title: 'Produk Terjual',
    value: '1,200',
    trend: '+12% bulan ini',
  },
  {
    id: 'business-growth',
    title: 'Pertumbuhan',
    value: '+18%',
    trend: 'Meningkat signifikan',
  },
]

export const salesChartTabs = [
  { id: 'weekly', label: 'Minggu', isActive: true },
  { id: 'monthly', label: 'Bulan', isActive: false },
]

export const salesChartData = [
  { day: 'Sen', amount: 18 },
  { day: 'Sel', amount: 28 },
  { day: 'Rab', amount: 46 },
  { day: 'Kam', amount: 38 },
  { day: 'Jum', amount: 58 },
  { day: 'Sab', amount: 74 },
  { day: 'Min', amount: 66 },
]

export const dashboardInsights = [
  {
    id: 'sales-up',
    title: 'Penjualan meningkat 18%',
    description:
      'Peningkatan signifikan terjadi di akhir pekan ini dibandingkan minggu lalu.',
    tone: 'success',
  },
  {
    id: 'best-product',
    title: 'Produk Kopi Susu Terlaris',
    description:
      'Produk ini berkontribusi terhadap 45% total pendapatan hari ini. Pertimbangkan restock bahan baku susu.',
    tone: 'info',
  },
]

export const latestTransactions = [
  {
    id: 'TRX-8821',
    productName: 'Kopi Susu Gula Aren',
    price: 'Rp 18.000',
    paymentMethod: 'QRIS',
    status: 'Selesai',
  },
  {
    id: 'TRX-8822',
    productName: 'Americano Ice (L)',
    price: 'Rp 22.000',
    paymentMethod: 'Tunai',
    status: 'Selesai',
  },
  {
    id: 'TRX-8823',
    productName: 'Brownies Cokelat',
    price: 'Rp 15.000',
    paymentMethod: 'QRIS',
    status: 'Proses',
  },
]

export const transactionStatusStyles = {
  Selesai: {
    badgeClassName:
      'bg-emerald-500/10 text-emerald-500 outline-emerald-500/20',
  },
  Proses: {
    badgeClassName:
      'bg-amber-500/10 text-amber-500 outline-amber-500/20',
  },
  Menunggu: {
    badgeClassName:
      'bg-sky-500/10 text-sky-400 outline-sky-500/20',
  },
  Dibatalkan: {
    badgeClassName:
      'bg-rose-500/10 text-rose-400 outline-rose-500/20',
  },
}
