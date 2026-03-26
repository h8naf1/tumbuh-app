function RoadmapFeedbackCard({ card }) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(76,29,149,0.16),rgba(59,130,246,0.10),rgba(15,23,42,0.95))] p-6 text-center shadow-[0_24px_45px_-28px_rgba(15,23,42,0.95)] sm:p-8">
      <h2 className="text-2xl font-bold text-white">{card.title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
        {card.description}
      </p>
      <button
        type="button"
        className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_20px_40px_-24px_rgba(59,130,246,0.95)] transition hover:bg-blue-500"
      >
        {card.buttonLabel}
      </button>
    </section>
  )
}

export default RoadmapFeedbackCard
