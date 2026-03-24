import {
  Bell,
  Building2,
  CircleUserRound,
  CreditCard,
  Globe,
  Lock,
  Package,
} from 'lucide-react'

const pengaturanSections = [
  {
    id: 'account',
    title: 'Akun',
    description: 'Kelola nama pengguna, email, dan informasi akun yang dipakai untuk masuk.',
    icon: CircleUserRound,
    accentClassName: 'bg-orange-500/12 text-orange-400',
  },
  {
    id: 'business-profile',
    title: 'Profil Bisnis',
    description: 'Perbarui nama usaha, alamat, dan informasi dasar toko agar data bisnis tetap rapi.',
    icon: Building2,
    accentClassName: 'bg-sky-500/12 text-sky-400',
  },
  {
    id: 'store-preferences',
    title: 'Preferensi Toko',
    description: 'Atur jam operasional, bahasa, dan pengaturan dasar yang dipakai sehari-hari.',
    icon: Globe,
    accentClassName: 'bg-violet-500/12 text-violet-400',
  },
  {
    id: 'inventory-settings',
    title: 'Pengaturan Inventori',
    description: 'Sesuaikan batas stok minimum, kategori produk, dan pengingat stok yang perlu dicek.',
    icon: Package,
    accentClassName: 'bg-emerald-500/12 text-emerald-400',
  },
  {
    id: 'notifications',
    title: 'Notifikasi',
    description: 'Pilih notifikasi penting yang ingin Anda terima untuk aktivitas usaha harian.',
    icon: Bell,
    accentClassName: 'bg-amber-500/12 text-amber-400',
  },
  {
    id: 'payment-methods',
    title: 'Metode Pembayaran',
    description: 'Atur metode pembayaran yang tersedia saat transaksi dicatat, seperti tunai, QRIS, atau transfer.',
    icon: CreditCard,
    accentClassName: 'bg-blue-500/12 text-blue-400',
  },
  {
    id: 'security',
    title: 'Keamanan Akun',
    description: 'Kelola password dan pengaturan keamanan dasar agar akun usaha tetap aman.',
    icon: Lock,
    accentClassName: 'bg-rose-500/12 text-rose-400',
  },
]

export default pengaturanSections
