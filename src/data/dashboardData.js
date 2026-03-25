import { latestTransactionRecords } from './transactionData.js'

// Data navigasi utama sidebar dashboard.
export const dashboardSidebarItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'products', label: 'Produk', href: '/produk' },
  { id: 'transactions', label: 'Transaksi', href: '/transaksi' },
  { id: 'chat-assistant', label: 'Asisten Chat', href: '/asisten-chat' },
  { id: 'settings', label: 'Pengaturan', href: '/pengaturan', isSeparated: true },
]

// Data profil user yang tampil di sidebar.
export const dashboardUserProfile = {
  name: 'Admin Tumbuh',
  role: 'admin@tumbuh.id',
  avatar: '',
}

// Data ringkasan KPI pada halaman dashboard.
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

// Data tab chart lama yang masih bisa dipakai jika diperlukan lagi.
export const salesChartTabs = [
  { id: 'weekly', label: 'Minggu', isActive: true },
  { id: 'monthly', label: 'Bulan', isActive: false },
]

// Data dasar pola penjualan untuk visual chart.
export const salesChartData = [
  { day: 'Sen', amount: 18 },
  { day: 'Sel', amount: 28 },
  { day: 'Rab', amount: 46 },
  { day: 'Kam', amount: 38 },
  { day: 'Jum', amount: 58 },
  { day: 'Sab', amount: 74 },
  { day: 'Min', amount: 66 },
]

// Data insight bisnis pada side card dashboard.
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
    title: 'Kopi Susu Gula Aren paling diminati',
    description:
      'Menu ini berkontribusi besar terhadap penjualan hari ini. Pastikan stok susu dan gula aren tetap aman.',
    tone: 'info',
  },
]

// Dummy data notifikasi pada topbar dashboard.
export const dashboardNotifications = [
  {
    id: 'notif-1',
    title: 'Stok croissant mulai menipis',
    description: 'Sisa stok Roti Croissant Butter tinggal sedikit. Sebaiknya segera restock hari ini.',
    time: '5 menit lalu',
    isUnread: true,
  },
  {
    id: 'notif-2',
    title: 'Kopi Butterscotch sedang naik',
    description: 'Penjualan menu ini meningkat dibandingkan hari sebelumnya.',
    time: '18 menit lalu',
    isUnread: true,
  },
  {
    id: 'notif-3',
    title: 'Laporan keuangan siap diunduh',
    description: 'Laporan keuangan terbaru untuk periode aktif sudah tersedia.',
    time: '1 jam lalu',
    isUnread: false,
  },
]

// Data transaksi terbaru untuk dashboard dan laporan.
export const latestTransactions = latestTransactionRecords

// Mapping style badge status transaksi.
export const transactionStatusStyles = {
  Selesai: {
    badgeClassName:
      'bg-emerald-500/10 text-emerald-500 outline-emerald-500/20',
  },

  Dibatalkan: {
    badgeClassName:
      'bg-rose-500/10 text-rose-400 outline-rose-500/20',
  },
}

