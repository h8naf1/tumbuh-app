import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import PengaturanGrid from '../components/Pengaturan/PengaturanGrid.jsx'
import PengaturanIntro from '../components/Pengaturan/PengaturanIntro.jsx'
import PengaturanSupportCard from '../components/Pengaturan/PengaturanSupportCard.jsx'
import PengaturanSectionData from '../components/Pengaturan/PengaturanSectionData.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

function PengaturanPage() {
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Pengaturan"
      subtitle="Kelola konfigurasi sistem bisnis dan preferensi usaha Anda."
      searchPlaceholder="Cari pengaturan..."
      showProfileButton={false}
    />
  )

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <PengaturanIntro totalSections={PengaturanSectionData.length} />
        <PengaturanGrid sections={PengaturanSectionData} />
        <PengaturanSupportCard />
      </div>
    </DashboardLayout>
  )
}

export default PengaturanPage
