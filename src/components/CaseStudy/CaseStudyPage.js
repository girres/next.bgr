import ScrollReveal from '@/components/ScrollReveal';
import { getAdjacentCaseStudies } from '@/content/case-studies';
import CaseStudyTopBar from './CaseStudyTopBar';
import CaseStudyHero from './CaseStudyHero';
import CaseStudyHiringMeta, { CaseStudyUserTesting } from './CaseStudyHiringMeta';
import CaseStudySection from './CaseStudySection';
import CaseStudyOutcomes from './CaseStudyOutcomes';

export default function CaseStudyPage({ study }) {
  const sections = study.sections ?? [];
  const adjacent = getAdjacentCaseStudies(study.slug);

  return (
    <main className='case-study project-page min-h-screen'>
      <CaseStudyTopBar
        prev={adjacent.prev}
        next={adjacent.next}
        index={adjacent.index}
        total={adjacent.total}
      />
      <ScrollReveal className='site-container'>
        <CaseStudyHero study={study} />
        <CaseStudyHiringMeta study={study} />
        {sections.map((section) => (
          <CaseStudySection key={section.id} section={section} title={study.title} />
        ))}
        <CaseStudyUserTesting study={study} />
        <CaseStudyOutcomes outcomes={study.outcomes} awards={study.awards} />
      </ScrollReveal>
    </main>
  );
}
