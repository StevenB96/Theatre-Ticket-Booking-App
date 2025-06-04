// app/admin/seats/SeatTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Seat } from '@/types/seat';
import SeatTableServer from './SeatTable.server';

interface SeatTableProps {
  data: Seat[];
};

export default function SeatTable({ data }: SeatTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this seat?')) return;
    await fetch('/api/seats/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <SeatTableServer data={data} onDelete={handleDelete} />;
};