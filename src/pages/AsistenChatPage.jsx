import ChatAssistantPanel from '../components/chat/ChatAssistantPanel.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import { FileText, MessageSquareText, ScanSearch } from 'lucide-react'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

function AsistenChatPage() {
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Asisten Chat"
      subtitle="Tanya jawab usaha dan upload nota belanja stok dalam satu tempat."
      searchPlaceholder="Cari percakapan..."
      showProfileButton={false}
    />
  )

  const introCards = [
    {
      id: 'ask-business',
      title: 'Tanya Jawab Usaha',
      description:
        'Gunakan chat untuk bertanya soal stok, pencatatan usaha, dan langkah operasional harian.',
      icon: MessageSquareText,
      accentClassName: 'bg-blue-500/10 text-blue-400',
    },
    {
      id: 'upload-receipt',
      title: 'Upload Nota Belanja',
      description:
        'Upload gambar atau PDF nota untuk mulai proses pembacaan item belanja stok.',
      icon: FileText,
      accentClassName: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'review-result',
      title: 'Cek dan Konfirmasi',
      description:
        'Sistem bisa memberi saran isi nota, lalu Anda tetap melakukan konfirmasi akhir.',
      icon: ScanSearch,
      accentClassName: 'bg-amber-500/10 text-amber-400',
    },
  ]

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {introCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-[0_18px_40px_-28px_rgba(2,6,23,0.8)]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accentClassName}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {card.description}
                </p>
              </article>
            )
          })}
        </section>

        <ChatAssistantPanel />
      </div>
    </DashboardLayout>
  )
}

export default AsistenChatPage
