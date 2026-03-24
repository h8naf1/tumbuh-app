import { useState } from 'react'
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
  const [selectedSectionId, setSelectedSectionId] = useState(
    PengaturanSectionData[0]?.id ?? '',
  )
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
  const selectedSection =
    PengaturanSectionData.find((section) => section.id === selectedSectionId) ||
    PengaturanSectionData[0]

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <PengaturanIntro totalSections={PengaturanSectionData.length} />
        <PengaturanGrid
          sections={PengaturanSectionData}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
        />

        <section className="rounded-[26px] border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Detail Menu Aktif
          </p>
          <h2 className="mt-3 text-xl font-semibold text-white">
            {selectedSection.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            {selectedSection.description}
          </p>
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
            Bagian ini siap dijadikan halaman detail atau form pengaturan khusus
            untuk menu <span className="font-semibold text-white">{selectedSection.title}</span>.
          </div>
        </section>
        <PengaturanSupportCard />
      </div>
    </DashboardLayout>
  )
}

export default PengaturanPage
