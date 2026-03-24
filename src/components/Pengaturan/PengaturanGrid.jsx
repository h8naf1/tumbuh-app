import { useEffect, useRef, useState } from 'react'
import PengaturanCard from './PengaturanCard.jsx'

function PengaturanGrid({
  sections,
  selectedSectionId,
  onSelectSection,
  onOpenSection,
}) {
  const [isMobileView, setIsMobileView] = useState(false)
  const cardRefs = useRef([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateIsMobileView = () => setIsMobileView(mediaQuery.matches)

    updateIsMobileView()
    mediaQuery.addEventListener('change', updateIsMobileView)

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobileView)
    }
  }, [])

  useEffect(() => {
    if (!isMobileView) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleEntry = [...entries]
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => secondEntry.intersectionRatio - firstEntry.intersectionRatio)[0]

        if (!mostVisibleEntry) {
          return
        }

        const nextSectionId = mostVisibleEntry.target.getAttribute('data-section-id')

        if (nextSectionId && nextSectionId !== selectedSectionId) {
          onSelectSection?.(nextSectionId)
        }
      },
      {
        threshold: [0.45, 0.6, 0.75],
        rootMargin: '-10% 0px -20% 0px',
      },
    )

    cardRefs.current.forEach((cardElement) => {
      if (cardElement) {
        observer.observe(cardElement)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [isMobileView, onSelectSection, sections, selectedSectionId])

  const handlePreviewSection = (sectionId) => {
    onSelectSection?.(sectionId)
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {sections.map((section, index) => (
        <PengaturanCard
          key={section.id}
          ref={(element) => {
            cardRefs.current[index] = element
          }}
          sectionId={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          accentClassName={section.accentClassName}
          isActive={selectedSectionId === section.id}
          onMouseEnter={() => {
            if (!isMobileView) {
              handlePreviewSection(section.id)
            }
          }}
          onFocus={() => handlePreviewSection(section.id)}
          onClick={() => onOpenSection?.(section.id)}
        />
      ))}
    </section>
  )
}

export default PengaturanGrid
