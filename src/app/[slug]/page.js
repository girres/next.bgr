import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/CaseStudy';
import {
  getCaseStudy,
  getAllCaseStudySlugs,
  getCaseStudyOgImage,
} from '@/content/case-studies';

export async function generateMetadata({ params }, parent) {
  const { slug = null } = await params;
  const study = getCaseStudy(slug);

  if (!slug || !study) return notFound();

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = getCaseStudyOgImage(study);

  return {
    title: `${study.title} — Case study`,
    description: study.overview,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  };
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function Page({ params = {} }) {
  const { slug = null } = await params;
  const study = getCaseStudy(slug);

  if (!slug || !study) return notFound();

  return <CaseStudyPage study={study} />;
}
