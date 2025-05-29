// src/app/admin/theatres/page.js
import Link from 'next/link';
import TheatreTable from './TheatreTable.client';
import { getAllTheatres } from '@/lib/db/theatre';

export default async function TheatresPage() {
  const theatres = await getAllTheatres();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Theatres</h1>
      <p>
        <Link href="/admin/theatres/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ New Theatre</button>
        </Link>
      </p>
      <TheatreTable data={theatres} />
    </div>
  );
};