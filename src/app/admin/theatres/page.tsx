// app/admin/theatres/page.tsx

import Link from 'next/link';
import TheatreTable from './TheatreTable';
import { getAllTheatres } from '@/library/db/theatre';

export default async function TheatresPage() {
  const theatres = await getAllTheatres();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Theatres</h1>
        <Link href="/admin/theatres/create" className="page-action">
          + New Theatre
        </Link>
      </div>
      <TheatreTable data={theatres} />
    </div>
  );
}
