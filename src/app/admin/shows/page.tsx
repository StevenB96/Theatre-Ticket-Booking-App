// app/admin/shows/page.tsx
import Link from 'next/link';
import ShowTable from './ShowTable.client';
import { getAllShows } from '@/library/db/show';

export default async function ShowsPage() {
  const shows = await getAllShows();

  return (
    <div>
      <h1>Shows</h1>
      <p>
        <Link href="/admin/shows/create">+ New Show</Link>
      </p>
      <ShowTable data={shows} />
    </div>
  );
};