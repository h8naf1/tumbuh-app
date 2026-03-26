function RoadmapFeedbackCard({ card }) {
  return (
    <section className="rounded-[1.75rem] border border-blue-500/20 bg-[linear-gradient(180deg,rgba(59,130,246,0.10),rgba(14,165,233,0.06),rgba(255,255,255,0.96))] p-6 text-center shadow-[0_24px_45px_-28px_rgba(15,23,42,0.12)] sm:p-8">
      <h2 className="text-2xl font-bold text-[var(--app-text)]">{card.title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--app-text-soft)] sm:text-base">
        {card.description}
      </p>
      <button
        type="button"
        className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-[var(--app-text)] shadow-[0_20px_40px_-24px_rgba(59,130,246,0.95)] transition hover:bg-blue-500"
      >
        {card.buttonLabel}
      </button>
    </section>
  )
}

export default RoadmapFeedbackCard

