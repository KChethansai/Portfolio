// Section heading: Bungee overline + giant in-flow title. Title words are
// split into masked lines so the rise reveal never changes layout geometry.
export function SectionHeading({ accent, title, titleClass, highlightClass }) {
  const words = String(title).split(' ')
  return (
    <div className="relative">
      <p className="relative w-fit overflow-hidden font-bungee text-sm uppercase tracking-[0.2em] text-default md:text-base">
        <span className="block">{accent}</span>
        <span className={`${highlightClass ?? ''} pointer-events-none absolute inset-0 block bg-default`} aria-hidden />
      </p>
      <h2
        className={`${titleClass ?? ''} mt-3 font-sans text-[clamp(2.75rem,8vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-tighter text-white`}
      >
        {words.map((w, i) => (
          <span key={i} className="rise-line block overflow-hidden pb-[0.08em]">
            <span className="block">{w}</span>
          </span>
        ))}
      </h2>
    </div>
  )
}
