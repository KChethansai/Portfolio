import React from 'react'
// Magic UI — Number Ticker
import { NumberTicker } from './magicui/number-ticker'
import { CardBody, CardContainer, CardItem } from './aceternity/3d-card'

function IntroSection() {
  return (
    <section
      id='intro'
      className='relative scroll-mt-24 px-6 py-24 md:py-32'
    >
      <div className='mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-end'>
        <div className='lg:col-span-7'>
          <p className='text-xs font-bold uppercase tracking-[0.2em] text-white/50'>
            01 - Selected work
          </p>
          <div className='my-8 h-px w-full bg-white/20' />
          <h2 className='max-w-5xl text-[clamp(3.5rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-tight text-white'>
            Build.
            <br />
            Ship.
            <br />
            Learn.
          </h2>
          <p className='mt-8 max-w-[52ch] text-[clamp(1rem,2.2vw,1.6rem)] leading-relaxed text-white/75'>
            A scrollable story of internships and projects built across data science, machine learning, and full-stack development.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5'>
          <CardContainer containerClassName='py-0' className='w-full'>
            <CardBody className='relative h-auto w-full panel-surface p-4 md:p-5 [transform-style:preserve-3d]'>
              <CardItem translateZ='30' className='w-full'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45'>CGPA</p>
                <p className='mt-2 text-3xl font-bold text-white md:text-4xl'>
                  <NumberTicker value={8.87} decimalPlaces={2} className='text-white' />
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer containerClassName='py-0' className='w-full'>
            <CardBody className='relative h-auto w-full panel-surface p-4 md:p-5 [transform-style:preserve-3d]'>
              <CardItem translateZ='30' className='w-full'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45'>Projects</p>
                <p className='mt-2 text-3xl font-bold text-white md:text-4xl'>
                  <NumberTicker value={3} className='text-white' />
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer containerClassName='py-0' className='w-full'>
            <CardBody className='relative h-auto w-full panel-surface p-4 md:p-5 [transform-style:preserve-3d]'>
              <CardItem translateZ='30' className='w-full'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45'>Internships</p>
                <p className='mt-2 text-3xl font-bold text-white md:text-4xl'>
                  <NumberTicker value={2} className='text-white' />
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
