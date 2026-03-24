import { useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import BusinessInsightCard from '../components/dashboard/BusinessInsightCard.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import TransactionDetailModal from '../components/dashboard/TransactionDetailModal.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard.jsx'
import SalesChartCard from '../components/dashboard/SalesChartCard.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import {
  dashboardInsights,
  dashboardSidebarItems,
  latestTransactions,
  salesChartData,
  salesChartTabs,
  dashboardSummaryCards,
  dashboardUserProfile,
  transactionStatusStyles,
} from '../data/dashboardData.js'

function DashboardPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = <DashboardTopbar />

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <div>
          <h1 className="fluid-title font-bold text-white">Dashboard</h1>
          <p className="fluid-subtitle mt-2 text-slate-400">
            Preview awal dashboard TUMBUH berdasarkan struktur desain Figma.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardSummaryCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
          <SalesChartCard
            title="Penjualan Harian"
            description="Statistik 7 hari terakhir"
            tabs={salesChartTabs}
            data={salesChartData}
          />

          <BusinessInsightCard
            title="Insight untuk Bisnis Anda"
            items={dashboardInsights}
            chartData={salesChartData}
          />
        </div>

        <RecentTransactionsCard
          title="Transaksi Terbaru"
          transactions={latestTransactions}
          statusStyles={transactionStatusStyles}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

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
