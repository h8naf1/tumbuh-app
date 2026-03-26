import { useState } from 'react'
import { Bot } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
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
  const [selectedSectionId, setSelectedSectionId] = useState(
    PengaturanSectionData[0]?.id ?? '',
  )
  const navigate = useNavigate()

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
    />
  )

  const selectedSection =
    PengaturanSectionData.find((section) => section.id === selectedSectionId) ||
    PengaturanSectionData[0]

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
        <PengaturanGrid
          sections={PengaturanSectionData}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          onOpenSection={handleOpenSection}
        />

        <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.16)] sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-500">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--app-text)]">Masih bingung memilih pengaturan?</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--app-text-muted)]">
                  Gunakan Asisten Chat untuk memahami fungsi menu, meminta saran pengaturan, atau mencari langkah yang paling sesuai untuk usaha Anda.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 border-[var(--app-border)] bg-[var(--app-surface)] px-4 text-[var(--app-text)] hover:bg-[var(--app-surface)]/80 hover:text-[var(--app-text)]"
            >
              <Link to="/asisten-chat">Buka Asisten Chat</Link>
            </Button>
          </div>
        </section>

        <PengaturanSupportCard />
      </div>
    </DashboardLayout>
  )
}

export default PengaturanPage
