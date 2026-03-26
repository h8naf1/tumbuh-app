import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import HelpCenterCard from '../components/PusatBantuan/HelpCenterCard.jsx'
import { dashboardSidebarItems, dashboardUserProfile } from '../data/dashboardData.js'

function PusatBantuanPage() {
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Pusat Bantuan"
      subtitle="Temukan panduan, jawaban cepat, dan bantuan penggunaan fitur TUMBUH di satu tempat."
    />
  )

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <HelpCenterCard />
      </div>
    </DashboardLayout>
  )
}

export default PusatBantuanPage
