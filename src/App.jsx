import { Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PersonalisasiBisnisPage from './pages/PersonalisasiBisnisPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProdukPage from './pages/ProdukPage.jsx'
import PengaturanPage from './pages/PengaturanPage.jsx'
import PengaturanDetailPage from './pages/PengaturanDetailPage.jsx'
import TransaksiPage from './pages/TransaksiPage.jsx'
import AsistenChatPage from './pages/AsistenChatPage.jsx'
import RoadmapPage from './pages/RoadmapPage.jsx'
import PusatBantuanPage from './pages/PusatBantuanPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

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
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/pusat-bantuan" element={<PusatBantuanPage />} />

        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="/pengaturan/:sectionId" element={<PengaturanDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/personalisasi-bisnis" element={<PersonalisasiBisnisPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* Analytics global aplikasi. */}
      <Analytics />
    </>
  )
}

export default App
