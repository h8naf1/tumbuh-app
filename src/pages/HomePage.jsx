import AboutSection from '../components/landing/AboutSection.jsx'
import ContactSection from '../components/landing/ContactSection.jsx'
import DashboardPreviewSection from '../components/landing/DashboardPreviewSection.jsx'
import FeaturesSection from '../components/landing/FeaturesSection.jsx'
import HomeSection from '../components/landing/HomeSection.jsx'
import MainNavbar from '../components/landing/MainNavbar.jsx'
import { Analytics } from "@vercel/analytics/react"

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <MainNavbar />
      <HomeSection />
      <AboutSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <ContactSection />
    </main>
  )
}

export default HomePage
