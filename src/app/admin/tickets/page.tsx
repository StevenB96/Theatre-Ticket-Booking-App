// app/admin/tickets/page.tsx
import Link from 'next/link';
import TicketTable from './TicketTable';
import { TicketModel } from '@/models/TicketModel';

export default async function TicketsPage() {
  const ticketModels = await TicketModel.findAll();
  const tickets = TicketModel.serialise(ticketModels);

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
