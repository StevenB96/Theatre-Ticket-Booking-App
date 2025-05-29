'use client';
import { useRouter } from 'next/navigation';
import TheatreTableServer from './TheatreTable.server';

export default function TheatreTable({ data }) {
  const router = useRouter();
  async function handleDelete(id) {
    if (!confirm('Delete this theatre?')) return;
    await fetch(`/api/theatres/${id}`, { method: 'DELETE' });
    router.refresh();
  }
  return <TheatreTableServer data={data} onDelete={handleDelete} />;
};