import ChatAssistantPanel from '../components/chat/ChatAssistantPanel.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'
function AsistenChatPage() {
  // Slot layout dashboard.
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )
  const topbar = (
    <DashboardTopbar
      title="Asisten Chat"
      subtitle="Tanya AI, scan barcode, atau upload nota dalam satu ruang kerja yang fleksibel."
    />
  )
  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      {/* Panel utama interaksi Asisten Chat. */}
      <ChatAssistantPanel />
    </DashboardLayout>
  )
}
export default AsistenChatPage