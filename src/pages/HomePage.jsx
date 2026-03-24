import AboutSection from '../components/landing/AboutSection.jsx'
import ContactSection from '../components/landing/ContactSection.jsx'
import DashboardPreviewSection from '../components/landing/DashboardPreviewSection.jsx'
import FeaturesSection from '../components/landing/FeaturesSection.jsx'
import FooterSection from '../components/landing/FooterSection.jsx'
import HomeSection from '../components/landing/HomeSection.jsx'
import MainNavbar from '../components/landing/MainNavbar.jsx'
import ProblemSection from '../components/landing/ProblemSection.jsx'
import SolutionSection from '../components/landing/SolutionSection.jsx'
function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigasi utama landing page. */}
      <MainNavbar />
      {/* Urutan section landing page TUMBUH. */}
      <HomeSection />
      <AboutSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <DashboardPreviewSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
export default HomePage