import {
  Bell,
  Building2,
  CircleUserRound,
  CreditCard,
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
    path: '/pengaturan/account',
    detailTitle: 'Informasi Akun',
    detailDescription:
      'Perbarui identitas akun utama yang digunakan untuk mengakses TUMBUH setiap hari.',
    highlights: [
      'Nama akun untuk login dan identitas pemilik usaha.',
      'Email aktif untuk pemberitahuan penting.',
      'Nomor WhatsApp yang bisa dihubungi saat diperlukan.',
    ],
    formSections: [
      {
        id: 'account-profile',
        title: 'Profil Pengguna',
        description: 'Data utama pemilik akun TUMBUH.',
        fields: [
          { id: 'fullName', label: 'Nama Lengkap', type: 'text', value: 'Raihan' },
          { id: 'email', label: 'Email', type: 'email', value: 'iamheroes276@gmail.com' },
          { id: 'phone', label: 'Nomor WhatsApp', type: 'tel', value: '082133306042' },
        ],
      },
    ],
  },
  {
    id: 'business-profile',
    title: 'Profil Bisnis',
    description: 'Perbarui nama usaha, alamat, dan informasi dasar toko agar data bisnis tetap rapi.',
    icon: Building2,
    accentClassName: 'bg-sky-500/12 text-sky-400',
    path: '/pengaturan/business-profile',
    detailTitle: 'Profil Bisnis',
    detailDescription:
      'Lengkapi identitas usaha yang akan ditampilkan di laporan dan membantu pencatatan bisnis lebih rapi.',
    highlights: [
      'Nama usaha yang muncul di laporan dan dashboard.',
      'Alamat usaha untuk dokumentasi bisnis.',
      'Deskripsi singkat agar identitas usaha lebih jelas.',
    ],
    formSections: [
      {
        id: 'business-main',
        title: 'Informasi Usaha',
        description: 'Data dasar usaha Anda.',
        fields: [
          { id: 'businessName', label: 'Nama Usaha', type: 'text', value: 'Kopi Nusantara' },
          { id: 'ownerName', label: 'Nama Pemilik', type: 'text', value: 'Raihan' },
          { id: 'businessPhone', label: 'Nomor Telepon Usaha', type: 'tel', value: '082133306042' },
          { id: 'businessAddress', label: 'Alamat', type: 'textarea', value: 'Klaten, Jawa Tengah, Indonesia' },
        ],
      },
    ],
  },
  {
    id: 'inventory-settings',
    title: 'Pengaturan Inventori',
    description: 'Sesuaikan batas stok minimum, kategori produk, dan pengingat stok yang perlu dicek.',
    icon: Package,
    accentClassName: 'bg-emerald-500/12 text-emerald-400',
    path: '/pengaturan/inventory-settings',
    detailTitle: 'Pengaturan Inventori',
    detailDescription:
      'Tentukan aturan inventori agar stok menipis dan produk kosong lebih cepat terdeteksi.',
    highlights: [
      'Batas minimum stok aman.',
      'Pengingat saat stok hampir habis.',
      'Kategori default untuk produk baru.',
    ],
    formSections: [
      {
        id: 'inventory-main',
        title: 'Aturan Inventori',
        description: 'Pengaturan dasar untuk memantau stok.',
        fields: [
          { id: 'minimumStock', label: 'Batas Stok Minimum', type: 'number', value: '10' },
          {
            id: 'defaultCategory',
            label: 'Kategori Default',
            type: 'select',
            value: 'Coffee',
            options: [
              { label: 'Coffee', value: 'Coffee' },
              { label: 'Pastry', value: 'Pastry' },
              { label: 'Food', value: 'Food' },
              { label: 'Drink', value: 'Drink' },
            ],
          },
          { id: 'stockReminder', label: 'Aktifkan Pengingat Stok', type: 'toggle', value: true },
        ],
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifikasi',
    description: 'Pilih notifikasi penting yang ingin Anda terima untuk aktivitas usaha harian.',
    icon: Bell,
    accentClassName: 'bg-amber-500/12 text-amber-400',
    path: '/pengaturan/notifications',
    detailTitle: 'Notifikasi',
    detailDescription:
      'Pilih pemberitahuan yang benar-benar penting agar Anda tidak kewalahan oleh notifikasi yang berlebihan.',
    highlights: [
      'Notifikasi transaksi baru.',
      'Pengingat stok menipis.',
      'Ringkasan aktivitas harian.',
    ],
    formSections: [
      {
        id: 'notification-main',
        title: 'Pilihan Notifikasi',
        description: 'Tentukan notifikasi yang ingin diterima.',
        fields: [
          { id: 'salesNotification', label: 'Transaksi Baru', type: 'toggle', value: true },
          { id: 'stockNotification', label: 'Stok Menipis', type: 'toggle', value: true },
          { id: 'dailySummary', label: 'Ringkasan Harian', type: 'toggle', value: false },
        ],
      },
    ],
  },
  {
    id: 'payment-methods',
    title: 'Metode Pembayaran',
    description: 'Atur metode pembayaran yang tersedia saat transaksi dicatat, seperti tunai, QRIS, atau transfer.',
    icon: CreditCard,
    accentClassName: 'bg-blue-500/12 text-blue-400',
    path: '/pengaturan/payment-methods',
    detailTitle: 'Metode Pembayaran',
    detailDescription:
      'Pilih metode pembayaran yang aktif agar pencatatan transaksi lebih sesuai dengan kondisi usaha Anda.',
    highlights: [
      'Atur metode pembayaran aktif.',
      'Tentukan metode default saat transaksi dicatat.',
      'Sesuaikan pilihan untuk toko offline maupun online.',
    ],
    formSections: [
      {
        id: 'payment-main',
        title: 'Metode Aktif',
        description: 'Pilih metode pembayaran yang bisa digunakan.',
        fields: [
          { id: 'cashEnabled', label: 'Tunai', type: 'toggle', value: true },
          { id: 'qrisEnabled', label: 'QRIS', type: 'toggle', value: true },
          { id: 'transferEnabled', label: 'Transfer', type: 'toggle', value: true },
          {
            id: 'defaultPayment',
            label: 'Metode Default',
            type: 'select',
            value: 'QRIS',
            options: [
              { label: 'Tunai', value: 'Tunai' },
              { label: 'QRIS', value: 'QRIS' },
              { label: 'Transfer', value: 'Transfer' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Keamanan Akun',
    description: 'Kelola password dan pengaturan keamanan dasar agar akun usaha tetap aman.',
    icon: Lock,
    accentClassName: 'bg-rose-500/12 text-rose-400',
    path: '/pengaturan/security',
    detailTitle: 'Keamanan Akun',
    detailDescription:
      'Atur password dan keamanan dasar akun agar data usaha tetap lebih aman untuk penggunaan harian.',
    highlights: [
      'Perbarui password akun utama.',
      'Atur pengingat keluar dari sesi lama.',
      'Aktifkan verifikasi dasar bila diperlukan.',
    ],
    formSections: [
      {
        id: 'security-main',
        title: 'Keamanan Dasar',
        description: 'Pengaturan utama untuk melindungi akun Anda.',
        fields: [
          { id: 'currentPassword', label: 'Password Saat Ini', type: 'password', value: '' },
          { id: 'newPassword', label: 'Password Baru', type: 'password', value: '' },
          { id: 'logoutOldSessions', label: 'Keluar dari perangkat lain', type: 'toggle', value: true },
        ],
      },
    ],
  },
]

export default pengaturanSections



