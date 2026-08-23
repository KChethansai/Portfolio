import React, { useState } from 'react'
// motion: the animation primitives (motion.div, motion.span, useScroll, etc.)
// AnimatePresence: enables exit animations when children are removed from the tree.
// easeOut: standard easing curve used across our transitions.
import { easeOut, motion, AnimatePresence, easeIn } from 'motion/react'
import ScrollVelocity from './ScrollVelocity'

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Animation variants
 * Variants are reusable animation states that motion components can reference
 * via the `variants` prop + an `initial`/`animate` pair like 'hidden'/'visible'.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

// Used by the marquee wrapper at the top of the section: fades up from below.
const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeIn, delay: 0.4 },
  },
}

// Education section reveal â€” same shape as SECTION_REVEAL but with a slightly
// shorter vertical offset (85 vs 100) so the cert cards feel a touch snappier.
const EDUCATION_REVEL = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

// Stagger parent for the cert grid: children cascade in one after another.
const EDU_STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

// Each cert card: small lift + fade.
const EDU_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

// Parent variant that orchestrates a staggered cascade of its children.
// `staggerChildren` is the gap between each child's reveal; `delayChildren`
// is the initial wait before the first child starts animating.
const STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
}

// Left-column entry: slides in a short distance from the left.
const ITEM1 = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
}

// Right-column entry: slides in from much further right (250px) so the
// left/right reveal feels balanced â€” long sweep on the right, subtle nudge on the left.
const ITEM2 = {
  hidden: { opacity: 0, x: 250 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Skill sets
 * Each card pulls from its own list so the "Skillsets & tools" row reads as
 * context-relevant rather than a generic dump of every tech on the resume.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

// Tech the user leans on for ML / data work.
const aiSkills = [
  'Python',
  'FastAPI',
  'XGBoost',
  'Gradient Boosting',
  'OCR',
  'BigQuery',
  'SQL',
  'Looker Studio',
]

// Tech the user leans on for web / app work.
const fullStackSkills = [
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'Zustand',
  'Socket.IO',
  'Tailwind CSS',
]

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Education & Certifications data
 * Each entry is a self-contained record with the minimum fields the card
 * needs to render. `link` opens the credential in a new tab; set it to
 * `null` if you don't have a public URL yet and the button hides itself.
 *
 *   title    â€” credential name (large heading)
 *   issuer   â€” organization that issued it (eyebrow / subtitle)
 *   status   â€” 'Completed' | 'Ongoing' â€” drives the badge color
 *   year     â€” year issued / expected
 *   summary  â€” 1â€“2 sentence description of what was learned
 *   link     â€” full URL to the credential, or null
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const education = [
  {
    title: 'B.Tech CSE (Data Science)',
    issuer: 'Anurag University',
    status: 'Ongoing',
    year: '2024 - 2028',
    summary: 'CGPA 8.87',
    link: null,
  },
  {
    title: 'Intermediate',
    issuer: 'Sri Chaitanya Jr Kalasala',
    status: 'Completed',
    year: '2024',
    summary: '93.3%',
    link: null,
  },
  {
    title: 'Secondary School',
    issuer: 'Sri Chaitanya Techno School',
    status: 'Completed',
    year: '2022',
    summary: '9.7',
    link: null,
  },
]

const certifications = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: '',
    status: 'Completed',
    year: '',
    summary: '',
    link: null,
  },
  {
    title: 'Data Fundamentals',
    issuer: '',
    status: 'Completed',
    year: '',
    summary: '',
    link: null,
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: '',
    status: 'Completed',
    year: '',
    summary: '',
    link: null,
  },
  {
    title: 'Networking Basics',
    issuer: '',
    status: 'Completed',
    year: '',
    summary: '',
    link: null,
  },
  {
    title: 'Introduction to Modern AI',
    issuer: '',
    status: 'Completed',
    year: '',
    summary: '',
    link: null,
  },
]

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * ServiceCard
 * A dashed-border card with corner brackets, a title/subtitle, and a body
 * that animates open on hover and closed on mouse-leave.
 *
 * Props:
 *   title    â€” large uppercase heading (e.g. "AI & DATA")
 *   subtitle â€” small caption underneath the title
 *   body     â€” paragraph shown inside the collapsible region
 *   skills   â€” array of strings rendered as pills
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ServiceCard({ title, subtitle, body, skills }) {
  // `hovered` tracks whether the mouse is currently inside the card.
  // The body is open when hovered, closed when not. We default to `false`
  // so the initial render is the *collapsed* state on hover-capable devices,
  // then AnimatePresence's `initial={true}` runs the open animation the
  // first time `hovered` flips to true (or on mount via the entry variant).
  const [hovered, setHovered] = useState(false)
  const open = hovered

  return (
    // Card root â€” hover handlers live here so the entire card is the hit area.
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative rounded-md border border-dashed border-white/25 bg-white/[0.02] px-6 py-7 md:px-8 md:py-9'
    >
      {/* Decorative corner brackets (â”Œ â” â”” â”˜) â€” each is a small absolutely-
          positioned square with two of its borders drawn. */}
      <span className='absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-white/70' />
      <span className='absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-white/70' />
      <span className='absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/70' />
      <span className='absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-white/70' />

      <div className='flex items-start justify-between gap-6'>
        <div className='flex-1'>
          {/* Title + subtitle stay visible regardless of hover state. */}
          <h3 className='text-3xl md:text-5xl font-bold tracking-tight text-white uppercase'>
            {title}
          </h3>
          <p className='mt-2 text-sm md:text-base text-white/60'>{subtitle}</p>

          {/* AnimatePresence runs the `exit` animation when `open` flips false.
              The inner motion.div animates `height` between 0 and 'auto' so the
              card's parent layout shifts smoothly as content appears/disappears. */}
          <AnimatePresence initial={true}>
            {open && (
              <motion.div
                key='content'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className='overflow-hidden'
              >
                <p className='mt-5 text-sm md:text-base leading-relaxed text-white/80 max-w-xl'>
                  {body}
                </p>

                <p className='mt-6 text-xs uppercase tracking-[0.2em] text-white/50 font-semibold'>
                  Skillsets &amp; tools
                </p>
                <ul className='mt-3 flex flex-wrap gap-2 list-none'>
                  {skills.map((skill) => (
                    <li key={skill}>
                      <span className='inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs md:text-sm font-medium text-white/85 transition-colors duration-300 ease-out hover:border-orange-700 hover:bg-orange-700 hover:text-white'>
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual chevron â€” rotates on hover to hint at the interaction.
            Decorative only (aria-hidden); the actual expand/collapse is
            driven by the card-level hover handlers above. */}
        <motion.span
          aria-hidden
          className='shrink-0 mt-1 flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white/80'
          animate={{ rotate: hovered ? 0 : 180 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-4 w-4'
          >
            <polyline points='6 9 12 15 18 9' />
          </svg>
        </motion.span>
      </div>
    </div>
  )
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * CredentialCard
 * A dashed-border card (matching the ServiceCard visual language) with:
 *   - Title + issuer row
 *   - Status badge (Completed / Ongoing)
 *   - Summary paragraph
 *   - "View Certificate" button (only rendered when `link` is provided)
 *
 * The whole card is a link to the credential when `link` is set, so clicking
 * anywhere on it opens the URL in a new tab. When no link is set (e.g. for
 * the B.Tech entry), the card stays non-interactive.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CredentialCard({ title, issuer, status, year, summary, link }) {
  const isOngoing = status === 'Ongoing'
  const Wrapper = link ? 'a' : 'div'
  const wrapperProps = link
    ? {
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `Open ${title} credential`,
      }
    : {}

  return (
    // The card root. When `link` is set, the entire card is a hyperlink so
    // visitors can click anywhere on it to open the credential.
    <Wrapper
      {...wrapperProps}
      className='group relative block rounded-md border border-dashed border-white/25 bg-white/[0.02] px-6 py-6 md:px-7 md:py-7 transition-colors duration-300 ease-out hover:border-orange-700 hover:bg-white/[0.04]'
    >
      {/* Corner brackets â€” same visual language as ServiceCard. */}
      <span className='absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-white/70' />
      <span className='absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-white/70' />
      <span className='absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/70' />
      <span className='absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-white/70' />

      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          {/* Title + issuer */}
          <h4 className='text-lg md:text-xl font-bold text-white truncate'>
            {title}
          </h4>
          {issuer ? (
            <p className='mt-1 text-xs md:text-sm text-white/60'>{issuer}</p>
          ) : null}

          {/* Year + status badge row */}
          <div className='mt-3 flex flex-wrap items-center gap-2'>
            {year ? (
              <span className='text-xs uppercase tracking-[0.2em] text-white/50'>
                {year}
              </span>
            ) : null}
            <span
              className={[
                'inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold',
                isOngoing
                  ? 'bg-orange-700/15 text-orange-400 border border-orange-700/40'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
              ].join(' ')}
            >
              {status}
            </span>
          </div>

          {/* Summary */}
          {summary ? (
            <p className='mt-3 text-sm leading-relaxed text-white/80'>
              {summary}
            </p>
          ) : null}
        </div>
      </div>

      {/* Inline "View Certificate" button â€” appears only when there's a link.
          It's also visually integrated (same border treatment) for users who
          don't realize the whole card is clickable. */}
      {link && (
        <div className='mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 ease-out group-hover:text-orange-700'>
          View Certificate
        </div>
      )}
    </Wrapper>
  )
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * About
 * The full <section id="about"> that renders:
 *   1. A scrolling marquee at the top (skill-line ticker).
 *   2. A two-column grid: heading on the left, two ServiceCards stacked on the right.
 *   3. An "Education & Certifications" section with a degree card plus a grid
 *      of credential cards, each linking out to the issuing platform.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function About() {
  return (
    <section
      id='about'
      className='relative z-10 w-full scroll-mt-6 bg-black/75 text-white py-16 md:py-20 overflow-hidden'
    >
      {/* Marquee ticker â€” fades up from below when it scrolls into view.
          `viewport={{ once: false, amount: 0.3 }}` means the animation
          re-runs every time the section enters/leaves the viewport. */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
        variants={SECTION_REVEAL}
        className='mb-20 md:mb-28'
      >
        <ScrollVelocity
          texts={['Data Science - Full Stack Development - Machine Learning']}
          velocity={80}
          className='text-black text-3xl md:text-6xl font-semibold bg-white p-7'
          numCopies={6}
        />
      </motion.div>

      {/* Heading + cards grid. The parent uses STAGGER so the left column and
          right column reveal with a small delay between them. */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.3 }}
        variants={STAGGER}
        className='mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16'
      >
        {/* Left column: eyebrow label + main heading.
            Uses ITEM1 (slides in from the left by 50px). */}
        <motion.div variants={ITEM1} className='md:col-span-5'>
          <p className='text-xs uppercase tracking-[0.2em] text-white/50 font-semibold'>
            About
          </p>
          <h2 className='mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white'>
            Building at the intersection of data, design, and code.
          </h2>
        </motion.div>

        {/* Right column: two ServiceCards stacked with a 6-unit gap.
            Uses ITEM2 (slides in from the right by 250px). */}
        <motion.div variants={ITEM2} className='md:col-span-7 flex flex-col gap-6'>
          <ServiceCard
            title='AI & Data'
            subtitle='Building Intelligent Systems'
            body='Building ML-powered tools including a disease prediction model covering 150+ diseases with XGBoost and Gradient Boosting, plus cloud analytics with BigQuery.'
            skills={aiSkills}
          />
          <ServiceCard
            title='Full Stack'
            subtitle='Scalable Web Architecture'
            body='Building full-stack MERN applications — including real-time collaborative systems and a paper trading platform with live market data.'
            skills={fullStackSkills}
          />
        </motion.div>
      </motion.div>

      {/* Education & Certifications */}
      <div id='education' className='mx-auto max-w-6xl px-6 mt-32 md:mt-40'>
        {/* Section heading */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.3 }}
          variants={EDUCATION_REVEL}
          className='text-center'
        >
          <p className='text-xs uppercase tracking-[0.2em] text-white/50 font-semibold'>
            Education &amp; Certifications
          </p>
          <h3 className='mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white'>
            Degrees &amp; Credentials
          </h3>
        </motion.div>

        {/* Degree card â€” full width, separate from the cert grid. */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.3 }}
          variants={EDU_STAGGER}
          className='mt-12 flex flex-col gap-6'
        >
          {education.map((item) => (
            <motion.div key={item.title} variants={EDU_ITEM}>
              <CredentialCard {...item} />
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications grid â€” 1 column on mobile, 2 on tablet+. */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.2 }}
          variants={EDU_STAGGER}
          className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          {certifications.map((cert) => (
            <motion.div key={cert.title} variants={EDU_ITEM}>
              <CredentialCard {...cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About



