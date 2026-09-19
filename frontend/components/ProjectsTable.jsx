import { SectionHeading } from './fx/SectionTitle'
import { useHighlightWipe } from './fx/reveal'
import { projects } from '@/lib/data'

export default function ProjectsTable() {
  useHighlightWipe('.projects-highlight')

  return (
    <section id="projects" className="relative w-full bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHeading
          accent="Selected"
          title="Projects"
        />
        <div className="pt-10">
          <div className="relative w-fit overflow-hidden">
            <p className="font-sans text-sm font-bold uppercase tracking-tighter">
              Idea to deployment
            </p>
            <span className="projects-highlight pointer-events-none absolute inset-0 block bg-default" aria-hidden />
          </div>
        </div>

        <div className="mt-12 hidden overflow-hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="font-sans text-sm uppercase tracking-tighter">
                <th scope="col" className="pb-9 pr-4 text-left">No / Project</th>
                <th scope="col" className="pb-9 pr-4 text-left">Stack</th>
                <th scope="col" className="pb-9 pr-4 text-left">When</th>
                <th scope="col" className="pb-9 text-left">Proof</th>
              </tr>
            </thead>
            <tbody className="[&:hover_.project-row]:opacity-35">
              {projects.map((p, i) => (
                <tr
                  key={p.title}
                  data-index={i}
                  className="project-row group transition-colors duration-200 hover:bg-white/[0.04] hover:opacity-100!"
                >
                  <td className="border-y border-[#222] py-6 pr-4 align-top">
                    <span className="block font-bungee text-3xl leading-none text-default lg:text-4xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 block font-sans text-xl font-bold uppercase leading-tight tracking-tight lg:text-2xl">
                      {p.title}
                    </span>
                  </td>
                  <td className="border-y border-[#222] py-6 pr-4 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.tech.slice(0, 3).join(' / ')}
                  </td>
                  <td className="whitespace-nowrap border-y border-[#222] py-6 pr-4 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.year}
                  </td>
                  <td className="border-y border-[#222] py-6 align-top font-sans text-sm font-semibold uppercase tracking-tight">
                    {p.metric ? (
                      <span>{p.metric.value} {p.metric.label}</span>
                    ) : (
                      <span className="flex gap-4">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="underline underline-offset-4">GitHub</a>
                        <a href={p.website} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="underline underline-offset-4">Live</a>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-col gap-5 md:hidden">
          {projects.map((p, i) => (
            <article key={p.title} className="rounded-xl border border-white/12 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between font-sans text-xs font-bold uppercase tracking-tighter text-white/50">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="mt-3 font-sans text-xl font-bold uppercase leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/65">
                  {p.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.title} tech stack`}>
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-default/50 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-tight text-default">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-6">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code`} className="inline-block py-2 font-sans text-sm font-bold uppercase underline underline-offset-4">
                    GitHub
                  </a>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="inline-block py-2 font-sans text-sm font-bold uppercase underline underline-offset-4">
                    Live
                  </a>
                </div>
              </article>
          ))}
        </div>
      </div>
    </section>
  )
}
