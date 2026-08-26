import React from 'react'
import { CardBody, CardContainer, CardItem } from './aceternity/3d-card'

const groups = [
  {
    title: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Zustand', 'react-beautiful-dnd'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'Socket.IO'],
  },
  {
    title: 'Data',
    items: ['MongoDB', 'MySQL', 'BigQuery', 'Supabase', 'SQL', 'Python', 'XGBoost', 'Gradient Boosting', 'OCR', 'Looker Studio'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'GitHub Actions', 'GitLab', 'Postman', 'Excel', 'Godot', 'Linux', 'JavaScript', 'C', 'C++', 'Java'],
  },
]

function SkillsSection() {
  return (
    <section id='skills' className='relative scroll-mt-24 px-6 py-16 md:py-24'>
      <div className='mx-auto max-w-6xl'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>04 - Skills</p>
        <div className='my-8 h-px w-full bg-white/20' />
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <h2 className='text-3xl font-semibold tracking-tight text-white md:text-5xl'>
            Building at the intersection of data, design, and code.
          </h2>
          <p className='text-sm text-white/45'>
            See the full stack above.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <CardContainer containerClassName='py-0' className='w-full'>
            <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
              <CardItem translateZ='30' className='w-full'>
                <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-cyan-300/90'>AI &amp; Data</h3>
                <p className='mt-2 text-sm text-white/60'>Building Intelligent Systems</p>
                <p className='mt-4 text-sm leading-relaxed text-white/80 md:text-base'>
                  Building ML-powered tools including a disease prediction model covering 150+ diseases with XGBoost and Gradient Boosting, plus cloud analytics with BigQuery.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>

          <CardContainer containerClassName='py-0' className='w-full'>
            <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
              <CardItem translateZ='30' className='w-full'>
                <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-cyan-300/90'>Full Stack</h3>
                <p className='mt-2 text-sm text-white/60'>Scalable Web Architecture</p>
                <p className='mt-4 text-sm leading-relaxed text-white/80 md:text-base'>
                  Building full-stack MERN applications — including real-time collaborative systems and a paper trading platform with live market data.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {groups.map((group) => (
            <CardContainer key={group.title} containerClassName='py-0' className='w-full'>
              <CardBody className='relative h-auto w-full panel-surface p-6 md:p-7 [transform-style:preserve-3d]'>
                <CardItem translateZ='30' className='w-full'>
                  <h3 className='text-sm font-bold uppercase tracking-[0.2em] text-cyan-300/90'>
                    {group.title}
                  </h3>
                  <ul className='mt-4 flex flex-wrap gap-2'>
                    {group.items.map((skill) => (
                      <li key={skill}>
                        <span className='inline-block rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/85 md:text-sm'>
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* Education & certifications — preserved resume facts */}
        <div id='education' className='mt-20'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>
            Education &amp; Certifications
          </p>
          <h3 className='mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl'>
            Degrees &amp; Credentials
          </h3>

          <div className='mt-10 flex flex-col gap-4'>
            <CardContainer containerClassName='py-0' className='w-full'>
              <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
                <CardItem translateZ='30' className='w-full'>
                  <h4 className='text-lg font-bold text-white md:text-xl'>B.Tech CSE (Data Science)</h4>
                  <p className='mt-1 text-sm text-white/60'>Anurag University</p>
                  <div className='mt-3 flex flex-wrap items-center gap-2'>
                    <span className='text-xs uppercase tracking-[0.2em] text-white/50'>2024 - 2028</span>
                    <span className='rounded-full border border-orange-700/40 bg-orange-700/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-400'>
                      Ongoing
                    </span>
                  </div>
                  <p className='mt-3 text-sm text-white/80'>CGPA 8.87</p>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer containerClassName='py-0' className='w-full'>
              <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
                <CardItem translateZ='30' className='w-full'>
                  <h4 className='text-lg font-bold text-white md:text-xl'>Intermediate</h4>
                  <p className='mt-1 text-sm text-white/60'>Sri Chaitanya Jr Kalasala</p>
                  <div className='mt-3 flex flex-wrap items-center gap-2'>
                    <span className='text-xs uppercase tracking-[0.2em] text-white/50'>2024</span>
                    <span className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400'>
                      Completed
                    </span>
                  </div>
                  <p className='mt-3 text-sm text-white/80'>93.3%</p>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer containerClassName='py-0' className='w-full'>
              <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
                <CardItem translateZ='30' className='w-full'>
                  <h4 className='text-lg font-bold text-white md:text-xl'>Secondary School</h4>
                  <p className='mt-1 text-sm text-white/60'>Sri Chaitanya Techno School</p>
                  <div className='mt-3 flex flex-wrap items-center gap-2'>
                    <span className='text-xs uppercase tracking-[0.2em] text-white/50'>2022</span>
                    <span className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400'>
                      Completed
                    </span>
                  </div>
                  <p className='mt-3 text-sm text-white/80'>9.7</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
            {[
              'Artificial Intelligence Fundamentals',
              'Data Fundamentals',
              'Introduction to Cybersecurity',
              'Networking Basics',
              'Introduction to Modern AI',
            ].map((title) => (
              <CardContainer key={title} containerClassName='py-0' className='w-full'>
                <CardBody className='relative h-auto w-full panel-surface p-6 [transform-style:preserve-3d]'>
                  <CardItem translateZ='30' className='w-full'>
                    <h4 className='text-lg font-bold text-white'>{title}</h4>
                    <div className='mt-3'>
                      <span className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400'>
                        Completed
                      </span>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
