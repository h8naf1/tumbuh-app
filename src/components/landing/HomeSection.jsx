import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Aurora from "../Aurora.jsx";

function HomeSection() {
  // Ref untuk animasi tiap area hero
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const previewRef = useRef(null);

  // Animasi masuk awal untuk elemen hero
  useLayoutEffect(() => {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen scroll-mt-28 items-center overflow-hidden px-6 pb-16 pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full" style={{ position: "relative" }}>
          <Aurora
            colorStops={["#00bfff", "#00e1ff", "#0091ff"]}
            amplitude={0.5}
            blend={1}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        {/* Area konten utama hero */}
        <div className="max-w-2xl">
          <p
            ref={eyebrowRef}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white"
          >
            <b>AI Sales Assistant untuk UMKM</b>
          </p>
          <h1
            ref={headingRef}
            className="max-w-xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            <span  className="text-white">Kelola penjualan dan</span> perkembangan usaha dengan lebih{" "}
            <span className="text-blue-600">mudah</span>.
          </h1>
          <p
            ref={descriptionRef}
            className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            TUMBUH membantu pemilik UMKM mencatat transaksi, memantau stok, dan
            memahami kondisi usaha dalam satu pengalaman yang sederhana dan
            nyaman digunakan setiap hari.
          </p>

          {/* Grup tombol CTA */}
          <div ref={ctaGroupRef} className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:bg-blue-700">
              Coba Demo
            </button>
            <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Lihat Cara Kerja
            </button>
          </div>
        </div>

        {/* Area preview tampilan produk */}
        <div
          ref={previewRef}
          className="relative mx-auto w-full max-w-110 lg:max-w-[500px]"
        >
          {/* Blur dekoratif di belakang preview */}
          <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-blue-200/70 blur-3xl" />
          <div className="absolute -right-5 bottom-10 h-32 w-32 rounded-full bg-cyan-200/70 blur-3xl" />

          {/* Card preview utama */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-3 shadow-[0_30px_80px_-34px_rgba(15,23,42,0.28)] backdrop-blur-sm">
            <div className="rounded-[1.6rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
              {/* Header preview */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                    Ringkasan Hari Ini
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Usaha Anda lebih tertata
                  </h2>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  Aktif
                </div>
              </div>

              {/* Isi ringkasan preview */}
              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Transaksi tercatat</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">128</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Produk aktif</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      42 item
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm text-slate-500">Stok perlu dicek</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      6 item
                    </p>
                  </div>
                </div>

                {/* Insight singkat */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Insight singkat
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
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
