import {
  Clients,
  Projects,
  Efforts,
  Tools,
  Experience,
  SkillsMarquee,
} from '@/components/Blocks';
import TextGenerateEffect from '@/components/TextGenerateEffect';
import ScrollReveal from '@/components/ScrollReveal';
import HeroScroll from '@/components/HeroScroll';
import HeroBadges from '@/components/HeroBadges';

export default function Home() {
  return (
    <main className='min-h-screen pb-20'>
      <h1 className='hidden'>Bryan Girado / Product Designer & AI Builder</h1>

      {/* Hero */}
      <section className='home-hero'>
        <HeroScroll />

        <div className='site-container home-hero__inner'>
          <div className='home-hero__content'>
            <p className='home-hero__role uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[10px] lg:text-xs font-medium pr-0 lg:pr-4'>
              End-to-End Product Designer & Front-End Builder
            </p>
            <p className='home-hero__name fontTitles text-main-white text-[clamp(3rem,10vw,7rem)] leading-[0.95] mt-5 lg:mt-8'>
              Bryan Girado
            </p>
            <TextGenerateEffect
              words="Madrid based. I design and build end-to-end digital products — bridging strategic product discovery with modular front-end development to ensure quality from concept to launch."
              className='home-hero__bio text-base lg:text-xl mt-6 lg:mt-8 text-main-gray font-light leading-relaxed max-w-xl'
              duration={0.5}
              filter={true}
              highlightWords={[
                'end-to-end',
                'strategic',
                'front-end',
                'concept',
                'launch.',
              ]}
            />
            <HeroBadges className='home-hero__badges--mobile' />
          </div>
        </div>

        <HeroBadges className='home-hero__badges--desktop' />
      </section>

      {/* Skills Marquee */}
      <ScrollReveal>
        <div className='mt-10 lg:mt-14'>
          <SkillsMarquee />
        </div>
      </ScrollReveal>

      {/* Projects Section */}
      <div className='pt-20 lg:pt-28 pb-4 lg:pb-6 site-container'>
        <Projects />
      </div>

      {/* Clients Section */}
      <ScrollReveal>
        <div className='-mt-6 lg:-mt-12 pt-2 lg:pt-4 pb-12 lg:pb-20 site-container'>
          <Clients />
        </div>
      </ScrollReveal>

      {/* Experience / About Section */}
      <ScrollReveal delay={0.1}>
        <div className='py-12 lg:py-20 site-container'>
          <Experience />
        </div>
      </ScrollReveal>

      {/* Efforts Section */}
      <ScrollReveal delay={0.1}>
        <div className='py-12 lg:py-20 site-container'>
          <Efforts />
        </div>
      </ScrollReveal>

      {/* Tools Section */}
      <ScrollReveal delay={0.1}>
        <div className='py-12 lg:py-20 site-container'>
          <Tools />
        </div>
      </ScrollReveal>
    </main>
  );
}
