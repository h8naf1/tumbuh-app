import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import BusinessInsightCard from '../components/dashboard/BusinessInsightCard.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
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
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = <DashboardTopbar />

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl font-bold text-white sm:text-2xl">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Preview awal dashboard TUMBUH berdasarkan struktur desain Figma.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardSummaryCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <SalesChartCard
            title="Penjualan Harian"
            description="Statistik 7 hari terakhir"
            tabs={salesChartTabs}
            data={salesChartData}
          />

          <BusinessInsightCard
            title="Insight untuk Bisnis Anda"
            items={dashboardInsights}
          />
        </div>

        <RecentTransactionsCard
          title="Transaksi Terbaru"
          transactions={latestTransactions}
          statusStyles={transactionStatusStyles}
        />
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
