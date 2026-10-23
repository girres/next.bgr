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
            <h1
              className='home-hero__role max-w-3xl mb-10 lg:mb-14'
              aria-label='End-to-End Product designer'
            >
              <span className='home-hero__role-hidden-line' aria-hidden='true'>
                <span className='home-hero__role-hidden'>End-to-End</span>
              </span>
              <span className='home-hero__role-main-line'>Product designer</span>
            </h1>
            <TextGenerateEffect
              words={`I've been called a product builder, end-to-end designer, front-end dev, astronaut... but "product designer" is still the one that feels right. I'm at my best taking complex B2B or B2C products from 0 to 1, combining early-stage discovery with modular systems thinking.`}
              className='home-hero__bio'
              duration={0.5}
              filter={true}
              highlightWords={[
                "i've",
                'been',
                'called',
                'product',
                'builder',
                'end-to-end',
                'front-end',
                'B2B',
                'B2C',
                'discovery',
                'modular',
                'systems',
                'thinking',
              ]}
              hoverPreviews={[
                {
                  match: 'astronaut',
                  src: '/images/home/peeks/astronaut.jpg',
                  alt: 'Astronaut — hover peek preview',
                  width: 300,
                  height: 188,
                },
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
