// src/app/admin/theatres/page.js
import Link from 'next/link';
import TheatreTable from './TheatreTable.client';
import { getAllTheatres } from '@/library/db/theatre';

export default async function TheatresPage() {
  const theatres = await getAllTheatres();
  return (
    <div>
      <h1>Theatres</h1>
      <p>
        <Link href="/admin/theatres/create">+ New Theatre</Link>
      </p>
      <TheatreTable data={theatres} />
    </div>
  );
};