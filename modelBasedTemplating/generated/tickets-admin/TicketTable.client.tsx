// app/admin/tickets/TicketTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';
import TicketTableServer from './TicketTable.server';

interface TicketTableProps {
  data: Ticket[];
};

export default function TicketTable({ data }: TicketTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this ticket?')) return;
    await fetch('/api/tickets/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <TicketTableServer data={data} onDelete={handleDelete} />;
};