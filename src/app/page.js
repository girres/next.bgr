import {
  Clients,
  Projects,
  Efforts,
  Tools,
  Experience,
} from '@/components/Blocks';
import TextGenerateEffect from '@/components/TextGenerateEffect';
import ScrollReveal from '@/components/ScrollReveal';
import ImageReveal from '@/components/ImageReveal';

export default function Home() {
  return (
    <main className='min-h-screen pt-28 lg:pt-36 pb-20'>
      <h1 className='hidden'>Bryan Girado / Product Designer & AI Builder</h1>
      <div className='site-container'>
        <ImageReveal />
        <TextGenerateEffect
          words="I'm Bryan — a Product Designer & AI Builder. I specialize in end-to-end product construction, using AI to transform deep customer insights into production-ready software."
          className='text-5xl lg:text-7xl mt-12 lg:mt-16 text-main-gray fontTitles leading-[1.15]'
          duration={0.6}
          filter={true}
          highlightWords={[
            'Product',
            'Designer',
            'AI',
            'Builder.',
            'production-ready',
            'software.',
          ]}
        />
      </div>
      {/* Clients Section */}
      <ScrollReveal>
        <div className='pt-8 lg:pt-11 pb-12 lg:pb-20 site-container'>
          <Clients />
        </div>
      </ScrollReveal>

      {/* Projects Section */}
      <ScrollReveal delay={0.1}>
        <div className='py-12 lg:py-20 site-container'>
          <Projects />
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

      {/* Experience Section */}
      <ScrollReveal delay={0.1}>
        <div className='py-12 lg:py-20 site-container'>
          <Experience />
        </div>
      </ScrollReveal>
    </main>
  );
}
// Force redeploy
