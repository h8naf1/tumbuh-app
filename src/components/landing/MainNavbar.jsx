import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Contact', href: '#contact' },
]

function MainNavbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.2,
  })

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setIsScrolled(value > 18)
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 origin-left bg-blue-600"
        style={{ scaleX: progress, height: 3 }}
      />

      <div className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <motion.nav
          animate={{
            y: isScrolled ? 0 : 6,
            scale: isScrolled ? 0.985 : 1,
            boxShadow: isScrolled
              ? '0 22px 60px -32px rgba(15, 23, 42, 0.35)'
              : '0 10px 30px -24px rgba(15, 23, 42, 0.08)',
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white/88 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6">
            <a href="#home" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isScrolled ? 6 : 0, scale: isScrolled ? 0.94 : 1 }}
                transition={{ duration: 0.3 }}
                className="h-8 w-8 rounded-lg bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] shadow-[0_12px_24px_-14px_rgba(37,99,235,0.7)]"
              />
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-slate-900">SALEAI</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">UMKM OS</p>
              </div>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const itemId = item.href.replace('#', '')
                const isActive = activeSection === itemId

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-slate-100"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </a>
                )
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <motion.a
                href="#contact"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_32px_-18px_rgba(37,99,235,0.95)]"
              >
                Login
              </motion.a>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
              aria-label="Toggle navigation"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${
                    isMobileOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition ${
                    isMobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition ${
                    isMobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isMobileOpen ? 'auto' : 0,
              opacity: isMobileOpen ? 1 : 0,
            }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-100 md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {navItems.map((item) => {
                const itemId = item.href.replace('#', '')
                const isActive = activeSection === itemId

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-3 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </a>
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </>
  )
}

export default MainNavbar
