import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import BrandLogo from '../BrandLogo.jsx'

const navItems = [
  { label: 'Beranda', href: '#home' },
  {
    label: 'Tentang',
    href: '#about',
    children: [
      { label: 'Masalah UMKM', href: '#problem' },
      { label: 'Solusi TUMBUH', href: '#solution' },
    ],
  },
  { label: 'Fitur', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Kontak', href: '#contact' },
]

function MainNavbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.2,
  })
  const progressScale = isMobileView ? scrollYProgress : progress
  const activeSectionRef = useRef('home')
  const isProgrammaticScrollRef = useRef(false)
  const scrollUnlockTimeoutRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const updateIsMobileView = () => setIsMobileView(mediaQuery.matches)

    updateIsMobileView()
    mediaQuery.addEventListener('change', updateIsMobileView)

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobileView)
    }
  }, [])

  useEffect(() => {
    const sections = navItems
      .flatMap((item) => [item, ...(item.children || [])])
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const updateActiveSection = () => {
      if (isProgrammaticScrollRef.current) {
        return
      }

      const focusLine = window.innerHeight * 0.38

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect()

        return rect.top <= focusLine && rect.bottom > focusLine
      })

      if (currentSection?.id) {
        if (currentSection.id !== activeSectionRef.current) {
          activeSectionRef.current = currentSection.id
          setActiveSection(currentSection.id)
        }
        return
      }

      const nearestSection = [...sections]
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= focusLine)

      if (nearestSection?.id && nearestSection.id !== activeSectionRef.current) {
        activeSectionRef.current = nearestSection.id
        setActiveSection(nearestSection.id)
      }
    }

    let frame = 0
    const handleScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      const nextIsScrolled = value > 18

      setIsScrolled((currentValue) =>
        currentValue === nextIsScrolled ? currentValue : nextIsScrolled,
      )
    })

    return () => unsubscribe()
  }, [scrollY])

  useEffect(() => {
    return () => {
      if (scrollUnlockTimeoutRef.current) {
        window.clearTimeout(scrollUnlockTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (event, href) => {
    setIsMobileOpen(false)
    setIsAboutMobileOpen(false)

    if (!isMobileView || !href.startsWith('#')) {
      return
    }

    const target = document.querySelector(href)

    if (!target) {
      return
    }

    event.preventDefault()

    const targetId = href.replace('#', '')
    activeSectionRef.current = targetId
    setActiveSection(targetId)
    isProgrammaticScrollRef.current = true

    if (scrollUnlockTimeoutRef.current) {
      window.clearTimeout(scrollUnlockTimeoutRef.current)
    }

    const navbar = document.querySelector('[data-main-navbar]')
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0
    const targetTop =
      window.scrollY + target.getBoundingClientRect().top - navbarHeight - 20

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'auto',
    })
    window.history.replaceState(null, '', href)

    scrollUnlockTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 120)
  }

  const isAboutGroupActive = ['about', 'problem', 'solution'].includes(activeSection)

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 origin-left bg-blue-600"
        style={{
          scaleX: progressScale,
          height: isMobileView ? 2 : 3,
          opacity: isMobileView ? 0.9 : 1,
        }}
      />

      <div className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-5 lg:px-6">
        <motion.nav
          animate={{
            y: isScrolled ? 0 : 6,
            scale: isScrolled ? 0.985 : 1,
            boxShadow: isScrolled
              ? '0 24px 64px -34px rgba(2, 6, 23, 0.72)'
              : '0 10px 30px -24px rgba(2, 6, 23, 0.28)',
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          data-main-navbar
          className="mx-auto max-w-[1120px] rounded-2xl border border-slate-800/80 bg-slate-950/84 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <a href="#home" className="flex min-w-0 items-center">
              <motion.div
                animate={{ rotate: isScrolled ? 6 : 0, scale: isScrolled ? 0.94 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <BrandLogo className="h-14 w-auto sm:h-16" />
              </motion.div>
            </a>

            <div className="hidden items-center gap-1 min-[1066px]:flex">
              {navItems.map((item) => {
                const itemId = item.href.replace('#', '')
                const isActive = item.children
                  ? isAboutGroupActive
                  : activeSection === itemId

                return (
                  <div key={item.href} className="group relative">
                    <a
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/8"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{item.label}</span>
                      {item.children && (
                        <ChevronDown className="h-4 w-4 text-slate-500 transition duration-200 group-hover:rotate-180 group-hover:text-slate-300" />
                      )}
                    </a>

                    {item.children && (
                      <div className="pointer-events-none absolute left-0 top-full z-20 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                        <div className="min-w-[220px] rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-[0_24px_64px_-34px_rgba(2,6,23,0.72)]">
                          {item.children.map((child) => {
                            const childId = child.href.replace('#', '')
                            const isChildActive = activeSection === childId

                            return (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={(event) => handleNavClick(event, child.href)}
                                className={`block rounded-xl px-4 py-3 text-sm transition ${
                                  isChildActive
                                    ? 'bg-blue-600/15 text-white'
                                    : 'text-slate-300 hover:bg-white/6 hover:text-white'
                                }`}
                              >
                                {child.label}
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="hidden items-center gap-3 min-[1066px]:flex">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/6 hover:text-white"
              >
                Masuk
              </Link>
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_32px_-18px_rgba(37,99,235,0.95)]"
                >
                  Mulai Gratis
                </Link>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-200 min-[1066px]:hidden"
              aria-label="Buka navigasi"
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
            className="overflow-hidden border-t border-slate-800 min-[1066px]:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {navItems.map((item) => {
                const itemId = item.href.replace('#', '')
                const isActive = item.children
                  ? isAboutGroupActive
                  : activeSection === itemId

                return (
                  <div key={item.href} className="space-y-2">
                    {item.children ? (
                      <>
                        <div className="flex items-center gap-2">
                          <a
                            href={item.href}
                            onClick={(event) => handleNavClick(event, item.href)}
                            className={`min-w-0 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-300 hover:bg-white/6 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </a>
                          <button
                            type="button"
                            onClick={() => setIsAboutMobileOpen((value) => !value)}
                            className={`inline-flex h-[46px] w-[32px] items-center justify-center rounded-xl transition ${
                              isAboutMobileOpen
                                ? 'text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                            aria-label="Buka submenu Tentang"
                            aria-expanded={isAboutMobileOpen}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition duration-200 ${
                                isAboutMobileOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isAboutMobileOpen ? 'auto' : 0,
                            opacity: isAboutMobileOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pl-3 pt-1">
                            {item.children.map((child) => {
                              const childId = child.href.replace('#', '')
                              const isChildActive = activeSection === childId

                              return (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  onClick={(event) => handleNavClick(event, child.href)}
                                  className={`block rounded-xl px-4 py-3 text-sm transition ${
                                    isChildActive
                                      ? 'border border-blue-500/30 bg-blue-600/10 text-white'
                                      : 'text-slate-400 hover:bg-white/6 hover:text-white'
                                  }`}
                                >
                                  {child.label}
                                </a>
                              )
                            })}
                          </div>
                        </motion.div>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.href)}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-white/6 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                )
              })}
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="mt-3 block rounded-xl border border-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-200"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileOpen(false)}
                className="mt-3 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Mulai Gratis
              </Link>
            </div>
          </motion.div>
        </motion.nav>
      </div>
    </>
  )
}

export default MainNavbar

