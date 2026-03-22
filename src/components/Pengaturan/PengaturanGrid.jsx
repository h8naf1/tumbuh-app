import PengaturanCard from './PengaturanCard.jsx'

function PengaturanGrid({ sections }) {
  return (
    <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {sections.map((section) => (
        <PengaturanCard
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          accentClassName={section.accentClassName}
        />
      ))}
    </section>
  )
}

export default PengaturanGrid
