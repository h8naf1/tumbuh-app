import { useState } from 'react'
import { Bot } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import PengaturanGrid from '../components/Pengaturan/PengaturanGrid.jsx'
import PengaturanSupportCard from '../components/Pengaturan/PengaturanSupportCard.jsx'
import PengaturanSectionData from '../components/Pengaturan/PengaturanSectionData.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

function PengaturanPage() {
  // State untuk preview menu pengaturan yang sedang disorot.
  const [selectedSectionId, setSelectedSectionId] = useState(
    PengaturanSectionData[0]?.id ?? '',
  )
  const navigate = useNavigate()
  // Slot layout dashboard.
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
      showProfileButton={false}
    />
  )
  // Data menu yang sedang aktif untuk kebutuhan preview atau navigasi.
  const selectedSection =
    PengaturanSectionData.find((section) => section.id === selectedSectionId) ||
    PengaturanSectionData[0]

  // Handler menuju halaman detail submenu pengaturan.
  const handleOpenSection = (sectionId) => {
    const section = PengaturanSectionData.find((item) => item.id === sectionId)

    if (!section?.path) {
      return
    }

    navigate(section.path)
  }

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        {/* Grid utama submenu pengaturan. */}
        <PengaturanGrid
          sections={PengaturanSectionData}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          onOpenSection={handleOpenSection}
        />

        

        {/* Shortcut bantuan kontekstual ke Asisten Chat. */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Masih bingung memilih pengaturan?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Gunakan Asisten Chat untuk memahami fungsi menu, meminta saran pengaturan, atau mencari langkah yang paling sesuai untuk usaha Anda.
                </p>
              </div>
            </div>

            <Link
              to="/asisten-chat"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Tanya lewat Asisten Chat
            </Link>
          </div>
        </section>
        {/* Kartu bantuan tambahan untuk halaman pengaturan. */}
        <PengaturanSupportCard />
      </div>
    </DashboardLayout>
  )
}

export default PengaturanPage
