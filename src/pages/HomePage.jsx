import AboutSection from '../components/landing/AboutSection.jsx'
import ContactSection from '../components/landing/ContactSection.jsx'
import DashboardPreviewSection from '../components/landing/DashboardPreviewSection.jsx'
import FeaturesSection from '../components/landing/FeaturesSection.jsx'
import HomeSection from '../components/landing/HomeSection.jsx'
import MainNavbar from '../components/landing/MainNavbar.jsx'

function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
