import PengaturanCard from './PengaturanCard.jsx'

function PengaturanGrid({ sections, selectedSectionId, onSelectSection }) {
  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {sections.map((section) => (
        <PengaturanCard
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          accentClassName={section.accentClassName}
          isActive={selectedSectionId === section.id}
          onClick={() => onSelectSection?.(section.id)}
        />
      ))}
    </section>
  )
}

export default PengaturanGrid
