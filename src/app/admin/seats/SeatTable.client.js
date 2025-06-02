'use client';

import { useRouter } from 'next/navigation';
import SeatTableServer from './SeatTable.server';

export default function SeatTable({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this seat?')) return;
    await fetch('/api/seats/' + id, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <SeatTableServer data={data} onDelete={handleDelete} />;
};