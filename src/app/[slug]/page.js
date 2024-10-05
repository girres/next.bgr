import { notFound } from 'next/navigation';
import Link from 'next/link';
import data from '@/projectsData';

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
    <main className='project-page site-containers px-5 min-h-screen py-24 bg-purple-900'>
      <div className='project-header grid grid-cols-12'>
        <div className='project-info col-span-12 lg:col-span-5 bg-pink-400'>
          <h1>{project.title}</h1>
          <h2>{project.caption}</h2>
          <div className='tags space-y-2'>
            {project.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        </div>
        <div className='project-images col-span-12 lg:col-span-7 bg-cyan-400'>
          <Gallery images={project.images} name={project.title} />
        </div>
      </div>
      <div>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>Reteki</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
