import ChatAssistantPanel from '../components/chat/ChatAssistantPanel.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
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

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <ChatAssistantPanel />
    </DashboardLayout>
  )
}

export default AsistenChatPage
