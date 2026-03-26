import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import DashboardElement from '../assets/elements/DashboardElement.png'
import BagElement from '../assets/elements/BagElement.png'
import BusinessManElement from '../assets/elements/BusinessManElement.png'

const DEFAULT_SPOTLIGHT_RADIUS = 220
const DEFAULT_GLOW_COLOR = '59, 130, 246'
const MOBILE_BREAKPOINT = 768
const DEFAULT_CARDS = [
  {
    color: '#020617',
    title: 'Analytics',
    description: 'Track user behavior',
    label: '01',
    image: DashboardElement,
  },
  {
    color: '#020617',
    title: 'Dashboard',
    description: 'Centralized data view',
    label: '02',
    image: BagElement,
  },
  {
    color: '#020617',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: '03',
    image: BusinessManElement,
  },
]

const normalizeCards = (items) =>
  items.map((item, index) => ({
    color: item.color || '#020617',
    title: item.title,
    description: item.description,
    label: item.label || item.badge || String(index + 1).padStart(2, '0'),
    variant: item.variant || 'default',
    image:
      item.image ??
      (index === 0
        ? DashboardElement
        : index === 1
          ? BagElement
          : index === 2
            ? BusinessManElement
            : undefined),
    imageAlt: item.imageAlt,
    imageClassName: item.imageClassName ?? 'h-full w-full object-cover object-top',
    mediaGlowClassName:
      item.mediaGlowClassName ?? 'from-blue-500/28 via-cyan-400/14 to-transparent',
    flowClassName: item.flowClassName ?? 'from-cyan-300/85 to-transparent',
  }))

const getGridClassName = (count) => {
  if (count >= 5) {
    return 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'
  }

  if (count === 4) {
    return 'grid gap-4 md:grid-cols-2 xl:grid-cols-4'
  }

  if (count === 3) {
    return 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'
  }

  return 'grid gap-4 md:grid-cols-2'
}

const getCardSpanClassName = (index, count) => {
  if (count === 3 && index === 0) {
    return 'xl:col-span-2'
  }

  return ''
}

const getSpotlightRanges = (radius) => ({
  near: radius * 0.45,
  far: radius * 0.8,
})

const updateCardGlow = (card, mouseX, mouseY, intensity, radius) => {
  const rect = card.getBoundingClientRect()
  const x = ((mouseX - rect.left) / rect.width) * 100
  const y = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${x}%`)
  card.style.setProperty('--glow-y', `${y}%`)
  card.style.setProperty('--glow-intensity', String(intensity))
  card.style.setProperty('--glow-radius', `${radius}px`)
}

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)

    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

function MagicBento({
  items = DEFAULT_CARDS,
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) {
  const sectionRef = useRef(null)
  const isMobile = useMobile()
  const shouldDisableAnimations = disableAnimations || isMobile
  const cards = normalizeCards(items)

  useEffect(() => {
    if (shouldDisableAnimations || !enableSpotlight || !sectionRef.current) {
      return undefined
    }

    const section = sectionRef.current
    const spotlight = document.createElement('div')
    spotlight.style.cssText = `
      position: fixed;
      width: 680px;
      height: 680px;
      border-radius: 999px;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.14) 0%,
        rgba(${glowColor}, 0.08) 16%,
        rgba(${glowColor}, 0.05) 28%,
        rgba(${glowColor}, 0.02) 44%,
        rgba(${glowColor}, 0.01) 60%,
        transparent 72%
      );
      z-index: 20;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect()
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      const cardElements = section.querySelectorAll('.magic-bento-card')
      if (!inside) {
        cardElements.forEach((card) => card.style.setProperty('--glow-intensity', '0'))
        gsap.to(spotlight, { opacity: 0, duration: 0.25, ease: 'power2.out' })
        return
      }

      const { near, far } = getSpotlightRanges(spotlightRadius)
      let closest = Infinity

      cardElements.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)
        closest = Math.min(closest, effectiveDistance)

        const intensity =
          effectiveDistance <= near
            ? 1
            : effectiveDistance <= far
              ? (far - effectiveDistance) / (far - near)
              : 0

        updateCardGlow(card, event.clientX, event.clientY, intensity, spotlightRadius)
      })

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        opacity:
          closest <= near
            ? 0.78
            : closest <= far
              ? ((far - closest) / (far - near)) * 0.78
              : 0,
        duration: 0.16,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      section.querySelectorAll('.magic-bento-card').forEach((card) => {
        card.style.setProperty('--glow-intensity', '0')
      })
      gsap.to(spotlight, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      spotlight.remove()
    }
  }, [enableSpotlight, glowColor, shouldDisableAnimations, spotlightRadius])

  return (
    <>
      <style>{`
        .magic-bento {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 220px;
        }

        .magic-bento-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          padding: 1px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.94)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.28)) 18%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.12)) 36%,
            transparent 66%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: ${enableBorderGlow ? 1 : 0};
          pointer-events: none;
          z-index: 3;
        }

        /* Highlight card — gradient border ring */
        .magic-bento-card-highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg,
            rgba(56, 189, 248, 0.55) 0%,
            rgba(34, 211, 238, 0.30) 35%,
            rgba(99, 102, 241, 0.22) 70%,
            rgba(56, 189, 248, 0.40) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 2;
        }

        .magic-bento-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div ref={sectionRef} className="magic-bento relative w-full select-none">
        <div className={getGridClassName(cards.length)}>
          {cards.map((card, index) => {
            const isHighlight = card.variant === 'highlight'
            return (
              <article
                key={`${card.label}-${index}`}
                className={[
                  'magic-bento-card group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] text-left',
                  isHighlight
                    ? 'magic-bento-card-highlight border border-sky-500/28'
                    : 'border border-slate-800/90',
                  getCardSpanClassName(index, cards.length),
                  shouldDisableAnimations
                    ? 'shadow-[0_22px_50px_-34px_rgba(2,6,23,0.82)]'
                    : isHighlight
                      ? 'transition duration-300 ease-out hover:-translate-y-[6px] hover:border-sky-400/50 hover:shadow-[0_36px_80px_-36px_rgba(34,211,238,0.38)]'
                      : 'transition duration-300 ease-out hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-[0_32px_70px_-40px_rgba(34,211,238,0.24)]',
                ].join(' ')}
                style={{
                  '--glow-x': '50%',
                  '--glow-y': '50%',
                  '--glow-intensity': '0',
                  '--glow-radius': '220px',
                  background: isHighlight
                    ? 'linear-gradient(160deg, rgba(2,10,30,0.99) 0%, rgba(7,22,48,0.99) 45%, rgba(2,14,36,0.99) 100%)'
                    : `linear-gradient(180deg, ${card.color} 0%, #0f172a 100%)`,
                  boxShadow: isHighlight
                    ? '0 22px 60px -32px rgba(2, 6, 23, 0.90), 0 0 0 1px rgba(56,189,248,0.12), 0 0 40px rgba(34, 211, 238, 0.07)'
                    : '0 22px 50px -34px rgba(2, 6, 23, 0.82), 0 0 0 1px rgba(30, 41, 59, 0.62), 0 0 26px rgba(59, 130, 246, 0.08)',
                }}
              >
                {/* Radial glow background — highlight only */}
                {isHighlight && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[1.6rem]"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(34,211,238,0.08) 0%, rgba(56,189,248,0.04) 40%, transparent 72%)',
                    }}
                  />
                )}

                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                    isHighlight
                      ? 'via-cyan-400/55 to-transparent'
                      : 'via-blue-400/35 to-transparent'
                  }`}
                />

                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/8">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.imageAlt || ''}
                      aria-hidden={card.imageAlt ? undefined : 'true'}
                      className={[
                        'transition duration-500 ease-out',
                        shouldDisableAnimations ? '' : 'group-hover:scale-[1.04]',
                        card.imageClassName,
                      ].join(' ')}
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),rgba(2,6,23,0.96)_72%)]" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.18)_42%,rgba(2,6,23,0.84)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.18] mix-blend-screen" />
                  <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${card.mediaGlowClassName}`} />

                  <div className="pointer-events-none absolute left-5 bottom-4 flex items-end gap-2">
                    <span
                      className={`h-16 w-px rounded-full bg-gradient-to-t ${card.flowClassName}`}
                      style={{ boxShadow: '0 0 18px rgba(34, 211, 238, 0.45)' }}
                    />
                    <span
                      className="mb-8 h-2.5 w-2.5 rounded-full bg-cyan-300"
                      style={{ boxShadow: '0 0 18px rgba(103, 232, 249, 0.72)' }}
                    />
                    <span
                      className="mb-12 h-2 w-2 rounded-full bg-blue-400/80"
                      style={{ boxShadow: '0 0 14px rgba(96, 165, 250, 0.5)' }}
                    />
                  </div>

                  <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full border border-white/10 bg-white/8 blur-2xl opacity-70" />
                  <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-cyan-400/20 bg-slate-950/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100/75 backdrop-blur">
                    Tumbuh
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        'inline-flex h-10 min-w-10 items-center justify-center rounded-2xl px-3 text-[11px] font-semibold tracking-[0.14em]',
                        isHighlight
                          ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.18)]'
                          : 'border border-blue-500/24 bg-blue-500/10 text-blue-200 shadow-[0_0_24px_rgba(59,130,246,0.16)]',
                      ].join(' ')}
                    >
                      {card.label}
                    </span>
                    <span
                      className={`h-px flex-1 bg-gradient-to-r ${
                        isHighlight
                          ? 'from-cyan-400/50 via-sky-300/25 to-transparent'
                          : 'from-blue-400/40 via-cyan-300/20 to-transparent'
                      }`}
                    />
                    {/* Badge Unggulan — highlight only */}
                    {isHighlight && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/25 bg-cyan-950/60 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-cyan-300/90 backdrop-blur">
                        <span aria-hidden="true">✨</span>
                        Unggulan
                      </span>
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div>
                      <h3
                        className={[
                          'text-lg font-bold leading-snug sm:text-[1.1rem]',
                          isHighlight ? 'text-white' : 'text-white',
                        ].join(' ')}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          isHighlight ? 'text-slate-300' : 'text-slate-300/95'
                        } ${
                          textAutoHide ? 'magic-bento-clamp' : ''
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent ${
                    isHighlight ? 'via-cyan-400/32 to-transparent' : 'via-cyan-400/20 to-transparent'
                  }`}
                />
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MagicBento
