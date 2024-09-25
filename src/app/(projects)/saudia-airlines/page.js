import Link from 'next/link';

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>Saudia Airlines</li>
          </ul>
        </div>
        <h1>Saudia Airlines</h1>
      </div>
    </main>
  );
}
