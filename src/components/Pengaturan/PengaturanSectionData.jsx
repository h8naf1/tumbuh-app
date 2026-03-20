import {
  Bell,
  Building2,
  CircleUserRound,
  CreditCard,
  Database,
  Globe,
  LayoutTemplate,
  Lock,
  Package,
  PlugZap,
} from 'lucide-react'

const pengaturanSections = [
  {
    id: 'account',
    title: 'Akun',
    description: 'Kelola detail personal, email, dan kredensial login Anda.',
    icon: CircleUserRound,
    accentClassName: 'bg-orange-500/12 text-orange-400',
  },
  {
    id: 'business-profile',
    title: 'Profil Bisnis',
    description: 'Perbarui nama usaha, alamat, dan informasi publik toko Anda.',
    icon: Building2,
    accentClassName: 'bg-sky-500/12 text-sky-400',
  },
  {
    id: 'store-preferences',
    title: 'Preferensi Toko',
    description: 'Atur jam operasional, mata uang, bahasa, dan format tampilan.',
    icon: Globe,
    accentClassName: 'bg-violet-500/12 text-violet-400',
  },
  {
    id: 'inventory-settings',
    title: 'Pengaturan Inventori',
    description: 'Sesuaikan batas stok minimum, kategori, dan notifikasi stok.',
    icon: Package,
    accentClassName: 'bg-emerald-500/12 text-emerald-400',
  },
  {
    id: 'notifications',
    title: 'Notifikasi',
    description: 'Kontrol jenis alert bisnis yang ingin Anda terima setiap hari.',
    icon: Bell,
    accentClassName: 'bg-amber-500/12 text-amber-400',
  },
  {
    id: 'security',
    title: 'Keamanan',
    description: 'Atur autentikasi dua langkah dan pantau sesi login akun.',
    icon: Lock,
    accentClassName: 'bg-rose-500/12 text-rose-400',
  },
  {
    id: 'integrations',
    title: 'Integrasi',
    description: 'Hubungkan aplikasi eksternal, CRM, dan tools marketing.',
    icon: PlugZap,
    accentClassName: 'bg-cyan-500/12 text-cyan-400',
  },
  {
    id: 'data-backup',
    title: 'Data & Backup',
    description: 'Ekspor laporan dan kelola backup cloud untuk sistem usaha Anda.',
    icon: Database,
    accentClassName: 'bg-fuchsia-500/12 text-fuchsia-400',
  },
  {
    id: 'payment-methods',
    title: 'Metode Pembayaran',
    description: 'Atur gateway pembayaran yang diterima dan aturan transaksinya.',
    icon: CreditCard,
    accentClassName: 'bg-blue-500/12 text-blue-400',
  },
  {
    id: 'display-layout',
    title: 'Tampilan Dashboard',
    description: 'Sesuaikan kartu utama, urutan widget, dan preferensi tampilan.',
    icon: LayoutTemplate,
    accentClassName: 'bg-indigo-500/12 text-indigo-400',
  },
]

export default pengaturanSections
