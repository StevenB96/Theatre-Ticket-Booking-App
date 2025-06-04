// app/admin/theatres/TheatreTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Theatre } from '@/types/theatre';
import TheatreTableServer from './TheatreTable.server';

interface TheatreTableProps {
  data: Theatre[];
};

export default function TheatreTable({ data }: TheatreTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this theatre?')) return;
    await fetch('/api/theatres/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <TheatreTableServer data={data} onDelete={handleDelete} />;
};