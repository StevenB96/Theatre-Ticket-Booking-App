'use client';

import { useRouter } from 'next/navigation';
import TicketTableServer from './TicketTable.server';

export default function TicketTable({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this ticket?')) return;
    await fetch('/api/tickets/' + id, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <TicketTableServer data={data} onDelete={handleDelete} />;
};