import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import DarkVeil from '../DarkVeil'
import TextType from './TextType.jsx'

function HomeSection() {
  const [isMobileView, setIsMobileView] = useState(false)

  // Ref animasi untuk setiap blok utama hero.
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const trustRowRef = useRef(null)
  const ctaGroupRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)')
    const updateIsMobileView = () => setIsMobileView(mediaQuery.matches)

    updateIsMobileView()
    mediaQuery.addEventListener('change', updateIsMobileView)

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobileView)
    }
  }, [])

  // Animasi masuk untuk hero landing.
  useLayoutEffect(() => {
    const targets = [
      eyebrowRef.current,
      headingRef.current,
      descriptionRef.current,
      trustRowRef.current,
      ctaGroupRef.current,
      previewRef.current,
    ]

    if (isMobileView) {
      const ctx = gsap.context(() => {
        gsap.set(targets, {
          autoAlpha: 0,
          y: 16,
        })

        gsap.set(previewRef.current, {
          scale: 0.98,
        })

        const tl = gsap.timeline({
          defaults: {
            duration: 0.45,
            ease: 'power2.out',
          },
        })

        tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.32 })
          .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, '-=0.12')
          .to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.38 }, '-=0.24')
          .to(trustRowRef.current, { autoAlpha: 1, y: 0, duration: 0.34 }, '-=0.18')
          .to(ctaGroupRef.current, { autoAlpha: 1, y: 0, duration: 0.36 }, '-=0.18')
          .to(
            previewRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.42,
            },
            '-=0.22',
          )
      }, sectionRef)

      return () => ctx.revert()
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        autoAlpha: 0,
        y: 32,
      })

      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: 'power3.out',
        },
      })

      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(headingRef.current, { autoAlpha: 1, y: 0 }, '-=0.15')
        .to(descriptionRef.current, { autoAlpha: 1, y: 0 }, '-=0.45')
        .to(trustRowRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.42')
        .to(
          ctaGroupRef.current,
          { autoAlpha: 1, y: 0, duration: 0.65 },
          '-=0.42',
        )
        .to(
          previewRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          '-=0.35',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobileView])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen scroll-mt-28 items-center overflow-hidden bg-slate-950 px-5 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-18 lg:h-screen lg:min-h-screen lg:pt-28 lg:pb-12"
    >
      <div className="absolute inset-0 z-0">
        {isMobileView ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),rgba(2,6,23,0.96)_62%)]" />
        ) : (
          <DarkVeil
            hueShift={30}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        )}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-280 items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-8 xl:gap-10">
        <div className="mx-auto max-w-xl self-center text-center lg:mx-0 lg:max-w-152 lg:self-center lg:text-left">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200"
          >
            Solusi usaha untuk UMKM
          </div>

          <h1
            ref={headingRef}
            className="mt-6 text-[2.5rem] font-black leading-[1.02] text-white sm:text-[3.2rem] xl:text-[4rem]"
          >
            Kelola usaha lebih mudah bersama
            <span className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              <br />
              <TextType
                texts={["TUMBUH"]}
                typingSpeed={120}
                deletingSpeed={70}
                pauseDuration={1600}
                loop={true}
                className="inline-block"
              />
            </span>
          </h1>

          <p
            ref={descriptionRef}
            className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-200 sm:text-[1rem]"
          >
            TUMBUH membantu pelaku UMKM mengelola transaksi, produk, dan insight usaha dengan cara yang sederhana, rapi, dan mudah dipahami setiap hari.
          </p>

          <div
            ref={trustRowRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300 lg:justify-start"
          >
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Asisten Chat untuk operasional
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Scan barcode & upload nota
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              Dashboard insight & laporan
            </span>
          </div>

          <div
            ref={ctaGroupRef}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-500"
            >
              Mulai Gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:border-blue-400/40 hover:bg-blue-500/15"
            >
              Lihat Dashboard
            </Link>
          </div>
        </div>

        <div
          ref={previewRef}
          className="relative mx-auto mt-6 w-full max-w-lg self-center sm:max-w-152 lg:-translate-y-3 lg:mt-0 lg:max-w-180 lg:self-center lg:justify-self-end lg:translate-x-8 xl:-translate-y-4 xl:max-w-200 xl:translate-x-14"
        >
          <div className="absolute -left-6 top-12 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl sm:h-28 sm:w-28 lg:-left-8 lg:h-32 lg:w-32" />
          <div className="absolute -right-6 bottom-6 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl sm:h-32 sm:w-32 lg:-right-8 lg:bottom-8 lg:h-36 lg:w-36" />

          <img
            src="/img/mockup hero section.svg"
            alt="Mockup dashboard dan mobile TUMBUH"
            className="relative z-10 block h-auto max-h-[60vh] w-full object-contain drop-shadow-[0_26px_80px_rgba(2,6,23,0.5)] lg:max-h-[66vh]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeSection


