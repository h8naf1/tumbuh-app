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
  },
  {
    color: '#020617',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: '03',
  },
]

const normalizeCards = (items) =>
  items.map((item, index) => ({
    color: item.color || '#020617',
    title: item.title,
    description: item.description,
    label: item.label || item.badge || String(index + 1).padStart(2, '0'),
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
    imageClassName:
      item.imageClassName ??
      (index === 0
        ? 'right-[-2%] top-[-10%] w-[500px]'
        : index === 1
          ? 'right-[-10%] top-[-6%] w-[360px]'
          : index === 2
            ? 'right-[-12%] top-[-10%] w-[390px]'
            : 'right-[-10%] top-[-8%] w-[360px]'),
  }))

const getGridClassName = (count) =>
  count === 3
    ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-[minmax(165px,_1fr)_minmax(165px,_1fr)]'
    : 'grid gap-4 md:grid-cols-2 xl:grid-cols-4'

const getCardSpanClassName = (index, count) => {
  if (count === 3 && index === 0) {
    return 'xl:col-span-2 xl:row-span-2 min-h-[280px]'
  }

  return 'min-h-[165px]'
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
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.96)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.34)) 16%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.12)) 34%,
            transparent 62%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: ${enableBorderGlow ? 1 : 0};
          pointer-events: none;
          z-index: 2;
        }

        .magic-bento-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div ref={sectionRef} className="magic-bento relative w-full select-none">
        <div className={getGridClassName(cards.length)}>
          {cards.map((card, index) => (
            <article
              key={`${card.label}-${index}`}
              className={[
                'magic-bento-card group relative overflow-hidden rounded-[1.55rem] border border-slate-800 p-5 text-left',
                'bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900',
                getCardSpanClassName(index, cards.length),
                shouldDisableAnimations
                  ? 'shadow-[0_22px_50px_-34px_rgba(2,6,23,0.78)]'
                  : 'transition duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[0_28px_60px_-34px_rgba(59,130,246,0.2)]',
              ].join(' ')}
              style={{
                '--glow-x': '50%',
                '--glow-y': '50%',
                '--glow-intensity': '0',
                '--glow-radius': '220px',
                background: `linear-gradient(145deg, ${card.color} 0%, #0f172a 100%)`,
                boxShadow:
                  '0 22px 50px -34px rgba(2, 6, 23, 0.78), 0 0 0 1px rgba(30, 41, 59, 0.65), 0 0 32px rgba(59, 130, 246, 0.08)',
              }}
            >
              {card.image ? (
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt || ''}
                    aria-hidden={card.imageAlt ? undefined : 'true'}
                    className={[
                      'absolute right-[-10%] top-[-14%] w-[540px] max-w-none',
                      'opacity-75 blur-[3px] brightness-[0.8] saturate-125 contrast-110',
                      'transition duration-500 ease-out',
                      'group-hover:opacity-85 group-hover:blur-[2px] group-hover:scale-[1.01]',
                      card.imageClassName || '',
                    ].join(' ')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/5 via-slate-950/20 to-slate-950/55" />
                </div>
              ) : null}

              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl"
                style={{ background: `rgba(${glowColor}, 0.16)` }}
              />

              <div className="relative z-[1] flex h-full flex-col justify-between gap-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-xs font-semibold tracking-[0.12em] text-blue-400 shadow-[0_0_28px_rgba(59,130,246,0.16)]">
                  {card.label}
                </span>

                <div className="relative flex flex-col">
                  <h3 className="mb-2 text-lg font-bold leading-snug text-white sm:text-xl">
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-6 text-slate-300 ${
                      textAutoHide ? 'magic-bento-clamp' : ''
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default MagicBento
