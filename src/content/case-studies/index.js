import saudiaAirlines from './saudia-airlines';
import reteki from './reteki';
import saudiaBeyond from './saudia-beyond';
import zonaHerragro from './zona-herragro';
import nuela from './nuela';

/** Display order on home work stack */
const CASE_STUDIES = [saudiaAirlines, reteki, saudiaBeyond, zonaHerragro, nuela];

function normalizeMediaBlocks(media) {
  if (!media) return [];
  return Array.isArray(media) ? media : [media];
}

function listingMediaSrcs(study) {
  const { listing } = study;
  if (!listing) return [];
  return [listing.image, listing.gif, listing.video].filter(Boolean);
}

function pageMediaSrcs(study) {
  const srcs = [];
  if (study.heroMedia?.src) srcs.push(study.heroMedia.src);
  if (study.userTestingMedia?.src) srcs.push(study.userTestingMedia.src);
  for (const section of study.sections ?? []) {
    for (const block of normalizeMediaBlocks(section.media)) {
      if (block.src) srcs.push(block.src);
    }
  }
  return srcs;
}

/** Work card assets and in-page media must use different files; in-page srcs must be unique. */
export function validateCaseStudyMedia(study) {
  const listing = listingMediaSrcs(study);
  const page = pageMediaSrcs(study);

  for (const src of listing) {
    if (page.includes(src)) {
      throw new Error(
        `[case-studies] "${study.slug}": work card asset "${src}" is also used on the case study page. Use separate files for the card and the page.`
      );
    }
  }

  const seen = new Set();
  for (const src of page) {
    if (seen.has(src)) {
      throw new Error(
        `[case-studies] "${study.slug}": "${src}" is used more than once on the case study page.`
      );
    }
    seen.add(src);
  }
}

CASE_STUDIES.forEach(validateCaseStudyMedia);

export function getAllCaseStudies() {
  return CASE_STUDIES;
}

export function getCaseStudy(slug) {
  if (!slug) return undefined;
  return CASE_STUDIES.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs() {
  return CASE_STUDIES.map((study) => study.slug);
}

export function isCaseStudyPath(pathname) {
  if (!pathname) return false;
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return CASE_STUDIES.some((study) => study.slug === slug);
}

/** Wraps around the display order so every case study has a previous and next */
export function getAdjacentCaseStudies(slug) {
  const index = CASE_STUDIES.findIndex((study) => study.slug === slug);
  if (index === -1) return { prev: null, next: null, index: -1, total: CASE_STUDIES.length };
  const total = CASE_STUDIES.length;
  return {
    prev: CASE_STUDIES[(index - 1 + total) % total],
    next: CASE_STUDIES[(index + 1) % total],
    index,
    total,
  };
}

function listingCaption(study) {
  const { client, year } = study;
  const type = study.hiring?.projectType?.split(',')[0]?.trim() || study.listing.tags[0];
  return `${client} · ${type} · ${year}`;
}

/** Shape expected by WorkCard / WorkStack */
export function getWorkListing() {
  return CASE_STUDIES.map((study) => {
    const { listing } = study;
    return {
      number: listing.number,
      title: study.title,
      headline: listing.headline,
      description: listing.description,
      caption: listingCaption(study),
      image: listing.image,
      gif: listing.gif ?? null,
      video: listing.video ?? null,
      videoClipEnd: listing.videoClipEnd ?? null,
      link: `/${study.slug}`,
      tags: listing.tags,
      award: listing.award ?? null,
      external: listing.external ?? false,
      confidential: listing.confidential ?? false,
      deviceMockup: listing.deviceMockup ?? false,
      showcase: listing.showcase ?? false,
      imageFit: listing.imageFit ?? 'cover',
      imagePosition: listing.imagePosition ?? 'center',
    };
  });
}

/** Legacy projectsData shape for any remaining imports */
export function getLegacyProjectsData() {
  return CASE_STUDIES.map((study) => ({
    title: study.title,
    caption: listingCaption(study),
    tags: study.tags,
    about: [study.overview],
    slug: study.slug,
    next: study.navigation?.nextSlug ? `/${study.navigation.nextSlug}` : undefined,
    images: study.gallery ?? [],
    aboutImages: [],
    aboutVideos: study.videos ?? [],
    website: study.website,
    cabinConcept: Boolean(study.awards?.length),
  }));
}

export function getCaseStudyOgImage(study) {
  if (!study) return undefined;
  if (study.heroMedia?.type === 'image') return study.heroMedia.src;
  return study.gallery?.[0] ?? study.listing?.image;
}

export default CASE_STUDIES;
