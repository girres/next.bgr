import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import data from '@/projectsData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// Components
import { Gallery, VideosMp4 } from '@/components/Projects';
import Button from '@/components/Button';

// SEO
export async function generateMetadata({ params }, parent) {
  const { slug = null } = params;
  const project = data.find((project) => {
    return project.slug === slug;
  });

  // If the project doesn't exist, return a 404 page
  if (!slug || !project || !project?.slug) return notFound();

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: project.title,
    openGraph: {
      images: [project.images[0], ...previousImages],
    },
  };
}

// STATIC GENERATION
export async function generateStaticParams() {
  return data.map((page) => ({ slug: page.slug }));
}

// STATIC RENDERING
export default function Page({ params = {} }) {
  const { slug = null } = params;
  const project = data.find((project) => {
    return project.slug === slug;
  });

  // If the project doesn't exist, return a 404 page
  if (!slug || !project || !project?.slug) return notFound();

  return (
    <main className='project-page site-container min-h-screen py-24'>
      <Link href='/#projects' className='project-page__back'>
        <MdChevronLeft className='h-5 w-5' aria-hidden='true' />
        Back to work
      </Link>
      <div className='project-header'>
        <div className='project-title flex flex-col lg:flex-row items-start lg:items-center lg:justify-between mt-10 mb-10 lg:mt-14 lg:mb-14 gap-4'>
          <h1>{project.title}</h1>
          {project.website && (
            <Button
              as='link'
              href={project.website}
              variant='secondary'
              size='sm'
              className='mt-2'
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Website
              <MdChevronRight className='h-4 w-4' />
            </Button>
          )}
        </div>
        <div className='grid grid-cols-12'>
          <div className='project-info col-span-12 lg:col-span-4'>
            <p className='text-subtitle'>{project.caption}</p>
            <ul className='flex flex-wrap lg:flex-col gap-2 items-start mt-10'>
              {project.tags.map((tag) => (
                <li key={tag} className='pill'>
                  {tag}
                </li>
              ))}
            </ul>
            {project.cabinConcept && (
              <a
                href='https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-subtitle inline-flex items-center gap-3 mt-10 hover:underline underline-offset-2'
              >
                <Image
                  src='/images/home/cabinConcept.png'
                  alt='Cabin Concept'
                  width={64}
                  height={64}
                  className='rounded-lg'
                />
                <span>Best Onboard Entertainment</span>
              </a>
            )}
          </div>
          <div className='project-images mt-10 lg:mt-0 col-span-12 lg:col-span-8'>
            <Gallery images={project.images} name={project.title} />
          </div>
        </div>
      </div>
      <div className='project-about section-y mt-16 lg:mt-20 grid grid-cols-12 gap-y-10 border-t border-black/10'>
        <div className='col-span-12 lg:col-span-7 lg:pr-10'>
          <h2 className='mb-10 lg:mb-14'>About the Project</h2>
          <div className='space-y-5 text-body'>
            {project.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className='col-span-12 lg:col-span-5'>
          {project.aboutVideos && project.aboutVideos.length > 0 && (
            <VideosMp4 videos={project.aboutVideos} name={project.title} />
          )}
          {project.aboutImages && project.aboutImages.length > 0 && (
            <Gallery images={project.aboutImages} name={project.title} />
          )}
        </div>
      </div>
      {project.next && (
        <div className='next-project'>
          <Button as='link' href={project.next} variant='secondary' size='sm'>
            Next Project
            <MdChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </main>
  );
}
