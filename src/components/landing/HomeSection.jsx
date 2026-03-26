import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
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
      className="relative flex min-h-screen short-screen-safe scroll-mt-28 items-center overflow-hidden bg-slate-950 px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-svh lg:pb-20 lg:pt-36"
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

      <div className="relative z-10 mx-auto grid w-full max-w-280 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] xl:gap-14">
        {/* Blok utama pesan hero dan CTA. */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-152.5 lg:text-left">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200"
          >
            Solusi usaha untuk UMKM
          </div>

          <h1
            ref={headingRef}
            className="mt-6 text-[2.65rem] font-black leading-[1.02] text-white sm:text-[3.45rem] xl:text-[4.2rem]"
          >
            Catat penjualan, pantau stok, dan pahami usaha Anda dalam satu alur bersama
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
            className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-200 sm:text-[1.02rem]"
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

          {/* CTA utama dibuat lebih fokus. */}
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

        {/* Preview produk dibuat lebih dekat dengan kemampuan TUMBUH saat ini. */}
        <div
          ref={previewRef}
          className="relative mx-auto w-full max-w-100 lg:max-w-120"
        >
          <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-5 bottom-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(160deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.98)_100%)] p-3 shadow-[0_30px_80px_-34px_rgba(2,6,23,0.75)] backdrop-blur-sm">
            <div className="rounded-[1.6rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(2,6,23,0.98)_100%)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
                    Ringkasan Hari Ini
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    Kontrol usaha lebih cepat
                  </h2>
                </div>
                <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  Aktif
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Penjualan tercatat hari ini</p>
                  <p className="mt-1 text-2xl font-bold text-white">128 transaksi</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Asisten Chat membantu</p>
                    <p className="mt-1 text-xl font-bold text-white">Draft stok & transaksi</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Scan dan nota</p>
                    <p className="mt-1 text-xl font-bold text-white">Lebih cepat diproses</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Insight singkat
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    Produk minuman dingin meningkat dalam 7 hari terakhir. Tambah stok sebelum jam siang agar penjualan tidak terlewat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection

