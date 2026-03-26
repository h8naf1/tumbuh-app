import { useEffect, useMemo, useRef, useState } from 'react'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  subDays,
} from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { Bot, ChevronDown, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import BusinessInsightCard from '../components/dashboard/BusinessInsightCard.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import TransactionDetailModal from '../components/dashboard/modal/TransactionDetailModal.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard.jsx'
import SalesChartCard from '../components/dashboard/SalesChartCard.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import {
  dashboardInsights,
  dashboardSidebarItems,
  latestTransactions,
  salesChartData,
  dashboardSummaryCards,
  dashboardUserProfile,
  transactionStatusStyles,
} from '../data/dashboardData.js'

// Preset waktu cepat untuk grafik penjualan.
const chartPresets = [
  { id: 'last-7-days', label: '7 hari terakhir' },
  { id: 'last-30-days', label: '1 bulan terakhir' },
]

// Helper untuk membuat deskripsi periode chart agar lebih mudah dibaca.
function formatMonthRangeDescription(from, to) {
  const sameMonth = format(from, 'M', { locale: localeId }) === format(to, 'M', { locale: localeId })
  const sameYear = format(from, 'yyyy', { locale: localeId }) === format(to, 'yyyy', { locale: localeId })

  if (sameMonth && sameYear) {
    return `Statistik 1 bulan terakhir (${format(from, 'd', { locale: localeId })} - ${format(to, 'd MMM yyyy', { locale: localeId })})`
  }

  if (sameYear) {
    return `Statistik 1 bulan terakhir (${format(from, 'd MMM', { locale: localeId })} - ${format(to, 'd MMM yyyy', { locale: localeId })})`
  }

  return `Statistik 1 bulan terakhir (${format(from, 'd MMM yyyy', { locale: localeId })} - ${format(to, 'd MMM yyyy', { locale: localeId })})`
}

function DashboardPage() {
  // State utama halaman dashboard.
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false)
  const [dateRange, setDateRange] = useState(() => ({
    from: subDays(new Date(), 6),
    to: new Date(),
  }))
  const downloadMenuRef = useRef(null)

  // Effect untuk menutup dropdown download saat klik luar atau tekan Escape.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!downloadMenuRef.current?.contains(event.target)) {
        setIsDownloadMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDownloadMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Slot layout dashboard.
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = <DashboardTopbar />

  // Nilai preset aktif akan menyesuaikan rentang tanggal yang dipilih.
  const activePreset = useMemo(() => {
    const totalDays = differenceInCalendarDays(dateRange.to, dateRange.from) + 1

    if (totalDays === 7) {
      return 'last-7-days'
    }

    if (totalDays === 30) {
      return 'last-30-days'
    }

    return 'custom'
  }, [dateRange])

  // Data chart dibentuk ulang berdasarkan rentang tanggal aktif.
  const salesChartRangeData = useMemo(() => {
    const pattern = salesChartData.map((item) => item.amount)
    const dates = eachDayOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    })

    return dates.map((date, index) => {
      const baseAmount = pattern[index % pattern.length]
      const variation = ((date.getDate() % 5) - 2) * 2
      const totalDays = dates.length
      const shortDayLabel = format(date, 'EEE', { locale: localeId })
      const sameMonthAsPrevious =
        index > 0 && format(date, 'M', { locale: localeId }) === format(dates[index - 1], 'M', { locale: localeId })

      return {
        day:
          totalDays > 14
            ? sameMonthAsPrevious
              ? format(date, 'd', { locale: localeId })
              : format(date, 'd MMM', { locale: localeId })
            : shortDayLabel,
        fullLabel: format(date, 'dd MMMM yyyy', { locale: localeId }),
        amount: Math.max(8, baseAmount + variation),
      }
    })
  }, [dateRange])

  // Deskripsi chart ikut berubah sesuai preset atau rentang manual.
  const chartDescription = useMemo(() => {
    if (activePreset === 'last-7-days') {
      return 'Statistik 7 hari terakhir'
    }

    if (activePreset === 'last-30-days') {
      return formatMonthRangeDescription(dateRange.from, dateRange.to)
    }

    return `Statistik ${format(dateRange.from, 'dd MMM', { locale: localeId })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: localeId })}`
  }, [activePreset, dateRange])

  // Handler preset cepat pada chart.
  const handlePresetChange = (presetId) => {
    const today = new Date()

    if (presetId === 'last-30-days') {
      setDateRange({
        from: subDays(today, 29),
        to: today,
      })
      return
    }

    setDateRange({
      from: subDays(today, 6),
      to: today,
    })
  }

  // Handler perubahan range dari date picker chart.
  const handleDateRangeChange = (nextRange) => {
    if (!nextRange?.from && !nextRange?.to) {
      return
    }

    const from = nextRange?.from ?? nextRange?.to ?? new Date()
    const to = nextRange?.to ?? nextRange?.from ?? from

    setDateRange({ from, to })
  }

  // Handler download laporan dashboard.
  const handleDownloadSalesReport = async () => {
    const { downloadSalesReportPdf } = await import('../lib/dashboardPdf.js')

    downloadSalesReportPdf({
      summaryCards: dashboardSummaryCards,
      transactions: latestTransactions,
      chartData: salesChartRangeData,
      dateRange,
    })
    setIsDownloadMenuOpen(false)
  }

  const handleDownloadFinanceReport = async () => {
    const { downloadFinanceReportPdf } = await import('../lib/dashboardPdf.js')

    downloadFinanceReportPdf({
      summaryCards: dashboardSummaryCards,
      transactions: latestTransactions,
      dateRange,
    })
    setIsDownloadMenuOpen(false)
  }

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        {/* Header halaman dan dropdown unduh laporan. */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="fluid-title font-bold text-[var(--app-text)]">Dashboard</h1>
            <p className="fluid-subtitle mt-2 text-[var(--app-text-soft)]">
              Preview awal dashboard TUMBUH berdasarkan struktur desain Figma.
            </p>
          </div>

          <div ref={downloadMenuRef} className="relative xl:self-start">
            <Button
  type="button"
  size="lg"
  onClick={() => setIsDownloadMenuOpen((open) => !open)}
  className="h-11 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700"
  aria-haspopup="menu"
  aria-expanded={isDownloadMenuOpen}
>
  <Download className="h-4 w-4" />
  Unduh Laporan
  <ChevronDown
    className={`h-4 w-4 transition ${isDownloadMenuOpen ? 'rotate-180' : ''}`}
  />
</Button>

            {isDownloadMenuOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 min-w-[240px] rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-2 shadow-[0_24px_64px_-34px_rgba(2,6,23,0.18)] transition-colors duration-300">
                <Button
  type="button"
  variant="ghost"
  onClick={handleDownloadSalesReport}
  className="h-auto w-full justify-start gap-3 rounded-lg px-3 py-3 text-left text-[var(--app-text)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
>
  <Download className="h-4 w-4 text-blue-400" />
  <span>Unduh Laporan Penjualan</span>
</Button>

                <Button
  type="button"
  variant="ghost"
  onClick={handleDownloadFinanceReport}
  className="h-auto w-full justify-start gap-3 rounded-lg px-3 py-3 text-left text-[var(--app-text)] hover:bg-[var(--app-surface)] hover:text-[var(--app-text)]"
>
  <Download className="h-4 w-4 text-blue-400" />
  <span>Unduh Laporan Keuangan</span>
</Button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Shortcut utama menuju Asisten Chat. */}
        <section className="rounded-2xl border border-blue-500/20 bg-[linear-gradient(135deg,rgba(37,99,235,0.16),color-mix(in_srgb,var(--app-surface-strong)_92%,transparent))] p-5 transition-colors duration-300 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/18 text-blue-500 shadow-[0_10px_24px_-14px_rgba(37,99,235,0.55)]">
                <Bot className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[var(--app-text)]">Butuh bantuan untuk mulai?</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--app-text-soft)]">
                Gunakan Asisten Chat untuk mencatat penjualan, scan barcode, atau upload nota tanpa perlu mencari menu satu per satu.
              </p>
            </div>

            <Button
  asChild
  variant="outline"
  size="lg"
  className="h-11 rounded-xl border-[var(--app-border)] bg-[var(--app-surface)] px-4 text-[var(--app-text)] hover:bg-[var(--app-surface-strong)] hover:text-[var(--app-text)]"
>
  <Link to="/asisten-chat">Buka Asisten Chat</Link>
</Button>
          </div>
        </section>

        {/* Ringkasan KPI dashboard. */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardSummaryCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        {/* Area chart penjualan dan insight bisnis. */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
          <SalesChartCard
            title="Penjualan Harian"
            description={chartDescription}
            presets={chartPresets}
            activePreset={activePreset}
            onPresetChange={handlePresetChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            data={salesChartRangeData}
          />

          <BusinessInsightCard
            title="Insight untuk Bisnis Anda"
            items={dashboardInsights}
            chartData={salesChartData}
          />
        </div>

        {/* Daftar transaksi terbaru. */}
        <RecentTransactionsCard
          title="Transaksi Terbaru"
          transactions={latestTransactions}
          statusStyles={transactionStatusStyles}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

      {/* Modal detail transaksi dari tabel dashboard. */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        statusStyles={transactionStatusStyles}
        formatRupiah={(amount) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`}
        onClose={() => setSelectedTransaction(null)}
      />
    </DashboardLayout>
  )
}

export default DashboardPage




