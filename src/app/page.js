import {
  Clients,
  Projects,
  Efforts,
  Tools,
  Experience,
} from '@/components/Blocks';
import SkillsMarquee from '@/components/SkillsMarquee';
import TextGenerateEffect from '@/components/TextGenerateEffect';
import HeroScroll from '@/components/HeroScroll';
import HeroBadges from '@/components/HeroBadges';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main className='min-h-screen pb-20 max-w-full'>
      {/* Hero */}
      <section className='home-hero'>
        <HeroScroll />

        <div className='site-container home-hero__inner'>
          <div className='home-hero__content'>
            <h1 className='home-hero__role max-w-3xl text-ink mb-10 lg:mb-14'>
              End-to-End Product designer
            </h1>
            <TextGenerateEffect
              words="Madrid based. I design and build end-to-end digital products — bridging strategic product discovery with modular front-end development to ensure quality from concept to launch."
              className='home-hero__bio'
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
      <ScrollReveal className='mt-14 lg:mt-20'>
        <SkillsMarquee />
      </ScrollReveal>

      {/* Projects Section */}
      <div className='section-y site-container'>
        <Projects />
      </div>

      {/* Clients Section */}
      <div className='section-y site-container'>
        <ScrollReveal>
          <Clients />
        </ScrollReveal>
      </div>

      {/* Experience / About Section */}
      <div className='section-y site-container'>
        <Experience />
      </div>

      {/* Efforts Section */}
      <div className='section-y site-container'>
        <ScrollReveal>
          <Efforts />
        </ScrollReveal>
      </div>

      {/* Tools Section */}
      <div className='section-y site-container'>
        <ScrollReveal>
          <Tools />
        </ScrollReveal>
      </div>
    </main>
  );
}
