// app/admin/tickets/page.tsx
import Link from 'next/link';
import TicketTable from './TicketTable.client';
import { getAllTickets } from '@/library/db/ticket';

export default async function TicketsPage() {
  const tickets = await getAllTickets();

  return (
    <div>
      <h1>Tickets</h1>
      <p>
        <Link href="/admin/tickets/create">+ New Ticket</Link>
      </p>
      <TicketTable data={tickets} />
    </div>
  );
};