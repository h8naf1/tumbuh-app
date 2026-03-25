import { useMemo, useState } from 'react'
import { Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import TransactionDetailModal from '../components/dashboard/TransactionDetailModal.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import TransactionFilterBar from '../components/transactions/TransactionFilterBar.jsx'
import TransactionStats from '../components/transactions/TransactionStats.jsx'
import TransactionTable from '../components/transactions/TransactionTable.jsx'
import { formatRupiah } from '../lib/formatters.js'
import { transactionRecords } from '../data/transactionData.js'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
  transactionStatusStyles,
} from '../data/dashboardData.js'

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'Selesai', label: 'Selesai' },
  { value: 'Dibatalkan', label: 'Dibatalkan' },
]

const paymentOptions = [
  { value: 'all', label: 'Semua Metode' },
  { value: 'QRIS', label: 'QRIS' },
  { value: 'Tunai', label: 'Tunai' },
  { value: 'Transfer', label: 'Transfer' },
]

function TransaksiPage() {
  // State utama untuk filter transaksi dan modal detail.
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMethod, setSelectedMethod] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Slot layout dashboard.
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
    />
  )

  // Data transaksi yang sudah difilter dari search, status, dan metode pembayaran.
  const filteredTransactions = useMemo(() => {
    return transactionRecords.filter((transaction) => {
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

  const cancelledCount = filteredTransactions.filter(
    (transaction) => transaction.status === 'Dibatalkan',
  ).length

  // Ringkasan angka utama halaman transaksi.
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
      id: 'cancelled-transactions',
      title: 'Transaksi Dibatalkan',
      value: cancelledCount,
      badge: cancelledCount > 0 ? 'Perlu dicek ulang' : 'Tidak ada pembatalan',
      iconClassName: 'bg-rose-500/10 text-rose-400',
      badgeClassName:
        cancelledCount > 0
          ? 'bg-rose-500/10 text-rose-400'
          : 'bg-slate-800 text-slate-300',
    },
  ]

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        {/* Ringkasan transaksi. */}
        <TransactionStats metrics={metrics} />

        {/* Shortcut bantuan kontekstual ke Asisten Chat. */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Ingin catat transaksi lebih cepat?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Buka Asisten Chat untuk mencatat penjualan lewat percakapan, scan barcode, atau upload nota tanpa input manual yang panjang.
                </p>
              </div>
            </div>

            <Link
              to="/asisten-chat"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Gunakan Asisten Chat
            </Link>
          </div>
        </section>

        {/* Toolbar filter transaksi. */}
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

        {/* Tabel transaksi dan aksi detail. */}
        <TransactionTable
          transactions={filteredTransactions}
          statusStyles={transactionStatusStyles}
          formatRupiah={formatRupiah}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

      {/* Modal detail transaksi. */}
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
