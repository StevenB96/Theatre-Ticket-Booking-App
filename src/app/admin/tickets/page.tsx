// app/admin/tickets/page.tsx
import Link from 'next/link';
import TicketTable from './TicketTable';
import { TicketModel } from '@/models/TicketModel';

export default async function TicketsPage() {
  const ticketModels = await TicketModel.findAll();
  const tickets = TicketModel.serialise(ticketModels);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <Link href="/admin/tickets/create" className="page-action">
          + New Ticket
        </Link>
      </div>
      <TicketTable data={tickets} />
    </div>
  );
};
