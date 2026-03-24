import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProdukPage from './pages/ProdukPage.jsx'
import PengaturanPage from './pages/PengaturanPage.jsx'
import PengaturanDetailPage from './pages/PengaturanDetailPage.jsx'
import TransaksiPage from './pages/TransaksiPage.jsx'
import AsistenChatPage from './pages/AsistenChatPage.jsx'

function App() {
  return (
    <>
      {/* Routing utama semua halaman aplikasi. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/transaksi" element={<TransaksiPage />} />
        <Route path="/asisten-chat" element={<AsistenChatPage />} />

        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="/pengaturan/:sectionId" element={<PengaturanDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {/* Analytics global aplikasi. */}
      <Analytics />
    </>
  )
}

export default App
