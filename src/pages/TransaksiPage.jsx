import { useMemo, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import TransactionDetailModal from '../components/dashboard/TransactionDetailModal.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import TransactionFilterBar from '../components/transactions/TransactionFilterBar.jsx'
import TransactionStats from '../components/transactions/TransactionStats.jsx'
import TransactionTable from '../components/transactions/TransactionTable.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
  transactionStatusStyles,
} from '../data/dashboardData.js'

const initialTransactions = [
  {
    id: 'TRX-9101',
    productName: 'Kopi Susu Gula Aren',
    customerName: 'Dina',
    date: '23 Mar 2026, 09:15',
    paymentMethod: 'QRIS',
    quantity: 2,
    total: 36000,
    status: 'Selesai',
  },
  {
    id: 'TRX-9102',
    productName: 'Americano Ice',
    customerName: 'Raka',
    date: '23 Mar 2026, 10:02',
    paymentMethod: 'Tunai',
    quantity: 1,
    total: 20000,
    status: 'Selesai',
  },
  {
    id: 'TRX-9103',
    productName: 'Brownies Cokelat',
    customerName: 'Nadia',
    date: '23 Mar 2026, 11:20',
    paymentMethod: 'QRIS',
    quantity: 3,
    total: 45000,
    status: 'Proses',
  },
  {
    id: 'TRX-9104',
    productName: 'Croissant Almond',
    customerName: 'Bayu',
    date: '23 Mar 2026, 12:10',
    paymentMethod: 'Transfer',
    quantity: 2,
    total: 50000,
    status: 'Menunggu',
  },
  {
    id: 'TRX-9105',
    productName: 'Matcha Latte',
    customerName: 'Salsa',
    date: '23 Mar 2026, 13:45',
    paymentMethod: 'QRIS',
    quantity: 1,
    total: 24000,
    status: 'Selesai',
  },
  {
    id: 'TRX-9106',
    productName: 'Roti Bakar Cokelat',
    customerName: 'Yoga',
    date: '23 Mar 2026, 15:05',
    paymentMethod: 'Tunai',
    quantity: 2,
    total: 30000,
    status: 'Dibatalkan',
  },
]

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'Selesai', label: 'Selesai' },
  { value: 'Proses', label: 'Proses' },
  { value: 'Menunggu', label: 'Menunggu' },
  { value: 'Dibatalkan', label: 'Dibatalkan' },
]

const paymentOptions = [
  { value: 'all', label: 'Semua Metode' },
  { value: 'QRIS', label: 'QRIS' },
  { value: 'Tunai', label: 'Tunai' },
  { value: 'Transfer', label: 'Transfer' },
]

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}

function TransaksiPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMethod, setSelectedMethod] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Transaksi"
      subtitle="Lihat, cari, dan pantau penjualan harian usaha Anda dengan lebih rapi."
      searchPlaceholder="Cari transaksi..."
      showProfileButton={false}
    />
  )

  const filteredTransactions = useMemo(() => {
    return initialTransactions.filter((transaction) => {
      const matchesStatus =
        selectedStatus === 'all' || transaction.status === selectedStatus
      const matchesMethod =
        selectedMethod === 'all' || transaction.paymentMethod === selectedMethod
      const keyword = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !keyword ||
        transaction.id.toLowerCase().includes(keyword) ||
        transaction.productName.toLowerCase().includes(keyword) ||
        transaction.customerName.toLowerCase().includes(keyword)

      return matchesStatus && matchesMethod && matchesSearch
    })
  }, [searchQuery, selectedMethod, selectedStatus])

  const totalRevenue = filteredTransactions
    .filter((transaction) => transaction.status !== 'Dibatalkan')
    .reduce((sum, transaction) => sum + transaction.total, 0)

  const pendingCount = filteredTransactions.filter(
    (transaction) =>
      transaction.status === 'Proses' || transaction.status === 'Menunggu',
  ).length

  const metrics = [
    {
      id: 'total-transactions',
      title: 'Total Transaksi',
      value: filteredTransactions.length,
      badge: 'Aktivitas hari ini',
      iconClassName: 'bg-blue-500/10 text-blue-400',
      badgeClassName: 'bg-blue-500/10 text-blue-400',
    },
    {
      id: 'today-revenue',
      title: 'Pendapatan Tercatat',
      value: formatRupiah(totalRevenue),
      badge: 'Data transaksi terfilter',
      iconClassName: 'bg-emerald-500/10 text-emerald-400',
      badgeClassName: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'pending-transactions',
      title: 'Perlu Ditindaklanjuti',
      value: pendingCount,
      badge: pendingCount > 0 ? 'Cek status transaksi' : 'Semua aman',
      iconClassName: 'bg-amber-500/10 text-amber-400',
      badgeClassName:
        pendingCount > 0
          ? 'bg-amber-500/10 text-amber-400'
          : 'bg-slate-800 text-slate-300',
    },
  ]

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <TransactionStats metrics={metrics} />

        <TransactionFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
          statusOptions={statusOptions}
          paymentOptions={paymentOptions}
        />

        <TransactionTable
          transactions={filteredTransactions}
          statusStyles={transactionStatusStyles}
          formatRupiah={formatRupiah}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

      <TransactionDetailModal
        transaction={selectedTransaction}
        statusStyles={transactionStatusStyles}
        formatRupiah={formatRupiah}
        onClose={() => setSelectedTransaction(null)}
      />
    </DashboardLayout>
  )
}

export default TransaksiPage
