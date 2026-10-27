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
  const title = `${study.title} — Case study`;
  const description = study.seo?.description || study.overview;
  const ogImage = study.seo?.image || getCaseStudyOgImage(study);
  const images = ogImage ? [ogImage, ...previousImages] : previousImages;

  return {
    title,
    description,
    keywords: study.seo?.keywords,
    alternates: study.seo?.canonical ? { canonical: study.seo.canonical } : undefined,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: study.seo?.image?.url ? [study.seo.image.url] : images,
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
