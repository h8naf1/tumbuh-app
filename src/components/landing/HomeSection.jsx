import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import DarkVeil from "../DarkVeil";

function HomeSection() {
  const [isMobileView, setIsMobileView] = useState(false);
  // Ref untuk animasi tiap area hero
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const updateIsMobileView = () => setIsMobileView(mediaQuery.matches);

    updateIsMobileView();
    mediaQuery.addEventListener("change", updateIsMobileView);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobileView);
    };
  }, []);

  // Animasi masuk awal untuk elemen hero
  useLayoutEffect(() => {
    if (isMobileView) {
      const ctx = gsap.context(() => {
        gsap.set(
          [
            eyebrowRef.current,
            headingRef.current,
            descriptionRef.current,
            ctaGroupRef.current,
            previewRef.current,
          ],
          {
            autoAlpha: 0,
            y: 16,
          },
        );

        gsap.set(previewRef.current, {
          scale: 0.98,
        });

        const tl = gsap.timeline({
          defaults: {
            duration: 0.45,
            ease: "power2.out",
          },
        });

        tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.32 })
          .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, "-=0.12")
          .to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.38 }, "-=0.24")
          .to(ctaGroupRef.current, { autoAlpha: 1, y: 0, duration: 0.36 }, "-=0.18")
          .to(
            previewRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.42,
            },
            "-=0.22",
          );
      }, sectionRef);

      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      // State awal elemen utama
      gsap.set(
        [
          eyebrowRef.current,
          headingRef.current,
          descriptionRef.current,
          ctaGroupRef.current,
          previewRef.current,
        ],
        {
          autoAlpha: 0,
          y: 32,
        },
      );

      // Timeline animasi hero
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power3.out",
        },
      });

      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(headingRef.current, { autoAlpha: 1, y: 0 }, "-=0.15")
        .to(descriptionRef.current, { autoAlpha: 1, y: 0 }, "-=0.45")
        .to(
          ctaGroupRef.current,
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.4",
        )
        .to(
          previewRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobileView]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen scroll-mt-28 items-center overflow-hidden bg-slate-950 px-6 pb-16 pt-32 sm:pt-36"
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        {/* Area konten utama hero */}
        <div className="max-w-2xl">
          <p
            ref={eyebrowRef}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-200"
          >
            <b>Solusi usaha untuk UMKM</b>
          </p>
          <h1
            ref={headingRef}
            className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-white">Kelola usaha Anda</span>
            <br />
            lebih <span className="text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">mudah</span>
            <br />
            <span className="text-white">bersama TUMBUH</span>
          </h1>
          <p
            ref={descriptionRef}
            className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg"
          >
            Catat penjualan, pantau stok, dan pahami perkembangan usaha dalam satu tempat yang sederhana dan mudah digunakan.
          </p>

          {/* Grup tombol CTA */}
          <div ref={ctaGroupRef} className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-700">
              Coba Demo
            </button>
            <button className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15">
              Lihat Cara Kerja
            </button>
          </div>
        </div>

        {/* Area preview tampilan produk */}
        <div
          ref={previewRef}
          className="relative mx-auto w-full max-w-[440px] lg:max-w-[500px]"
        >
          {/* Blur dekoratif di belakang preview */}
          <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-5 bottom-10 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />

          {/* Card preview utama */}
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(160deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.98)_100%)] p-3 shadow-[0_30px_80px_-34px_rgba(2,6,23,0.75)] backdrop-blur-sm">
            <div className="rounded-[1.6rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(2,6,23,0.98)_100%)] p-5">
              {/* Header preview */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
                    Ringkasan Hari Ini
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    Usaha Anda lebih tertata dan terpantau
                  </h2>
                </div>
                <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  Aktif
                </div>
              </div>

              {/* Isi ringkasan preview */}
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Transaksi tercatat</p>
                  <p className="mt-1 text-2xl font-bold text-white">128</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Produk aktif</p>
                    <p className="mt-1 text-xl font-bold text-white">
                      42 item
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Stok perlu dicek</p>
                    <p className="mt-1 text-xl font-bold text-white">
                      6 item
                    </p>
                  </div>
                </div>

                {/* Insight singkat */}
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Insight singkat
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    Penjualan minuman dingin naik dalam 7 hari terakhir. Coba
                    dorong promo di jam siang untuk hasil yang lebih baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
