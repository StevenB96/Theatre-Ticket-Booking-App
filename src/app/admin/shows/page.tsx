// app/admin/shows/page.tsx

import Link from 'next/link';
import ShowTable from './ShowTable';
import { getAllShows } from '@/library/db/show';

export default async function ShowsPage() {
  const shows = await getAllShows();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Shows</h1>
        <Link href="/admin/shows/create" className="page-action">
          + New Show
        </Link>
      </div>
      <ShowTable data={shows} />
    </div>
  );
}
