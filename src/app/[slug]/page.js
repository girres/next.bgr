import { notFound } from 'next/navigation';
import Link from 'next/link';
import data from '@/projectsData';
import { MdChevronRight } from 'react-icons/md';

// Components
import { Gallery } from '@/components/Projects';

// SEO
export async function generateMetadata({ params }, parent) {
  const { slug = null } = params;
  const project = data.find((project) => {
    return project.slug === slug;
  });

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
  return data.map((page) => page.slug);
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
    <main className='project-page site-container min-h-screen py-24 text-main-gray'>
      <div className='breadcrumbs text-xl fontLight'>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-main-white'>Projects</li>
        </ul>
      </div>
      <div></div>
      <div className='project-header'>
        <div className='project-title flex items-center justify-between'>
          <h1 className='my-10 text-main-white'>{project.title}</h1>
          {project.website && (
            <Link
              href={project.website}
              className='btn btn-sm rounded-full bg-transparent text-main-white border-main-white text-xs hover:bg-main-dark hover:scale-110'
            >
              Visit Website
              <MdChevronRight className='h-4 w-4' />
            </Link>
          )}
        </div>
        <div className='grid grid-cols-12'>
          <div className='project-info col-span-12 lg:col-span-4'>
            <h2>{project.caption}</h2>
            <div className='flex flex-col gap-2 items-start mt-10'>
              {project.tags.map((tag) => (
                <p
                  key={tag}
                  className='border-[1px] border-main-gray rounded-full text-sm p-2 px-5'
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className='project-images col-span-12 lg:col-span-8'>
            <Gallery images={project.images} name={project.title} />
          </div>
        </div>
      </div>
      <div className='project-about mt-10 text-sm grid grid-cols-12 pt-20'>
        <div className='col-span-12 lg:col-span-7 lg:pr-10'>
          <h2>
            <span className='text-main-white'>About</span>
            {` `}the Project
          </h2>
          {project.about.map((paragraph, index) => (
            <p key={index} className='my-5'>
              {paragraph}
            </p>
          ))}
        </div>
        <div className='col-span-12 lg:col-span-5'>
          <Gallery images={project.aboutImages} name={project.title} />
        </div>
      </div>
      {project.next && (
        <div className='next-project mt-20'>
          <Link
            href={project.next}
            className='btn btn-sm rounded-full bg-transparent text-main-white border-main-white text-xs hover:bg-main-dark hover:scale-110'
          >
            Next Project
            <MdChevronRight className='h-4 w-4' />
          </Link>
        </div>
      )}
    </main>
  );
}
