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

export default function Home() {
  return (
    <main className='min-h-screen pb-20 max-w-full'>
      <h1 className='sr-only'>
        Bryan Girado — End-to-End Product Designer &amp; Front-End Builder in Madrid
      </h1>

      {/* Hero */}
      <section className='home-hero'>
        <HeroScroll />

        <div className='site-container home-hero__inner'>
          <div className='home-hero__content'>
            <p className='home-hero__role uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[10px] lg:text-xs font-medium pr-0 lg:pr-4'>
              End-to-End Product Designer & Front-End Builder
            </p>
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
      <div className='mt-10 lg:mt-14'>
        <SkillsMarquee />
      </div>

      {/* Projects Section */}
      <div className='pt-20 lg:pt-28 pb-10 lg:pb-6 site-container'>
        <Projects />
      </div>

      {/* Clients Section */}
      <div className='mt-8 lg:-mt-12 pt-2 lg:pt-4 pb-12 lg:pb-20 site-container'>
        <Clients />
      </div>

      {/* Experience / About Section */}
      <div className='py-12 lg:py-20 site-container'>
        <Experience />
      </div>

      {/* Efforts Section */}
      <div className='py-12 lg:py-20 site-container'>
        <Efforts />
      </div>

      {/* Tools Section */}
      <div className='py-12 lg:py-20 site-container'>
        <Tools />
      </div>
    </main>
  );
}
