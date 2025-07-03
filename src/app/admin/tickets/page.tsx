// app/admin/tickets/page.tsx

import Link from 'next/link';
import TicketTable from './TicketTable';
import { TicketModel } from '@/models/TicketModel';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function TicketsPage() {
  // 1. Fetch all tickets
  const ticketModels = await TicketModel.findAll();

  // 2. Map into real data objects, awaiting each performance load
  const ticketsData = await Promise.all(
    ticketModels.map(async (ticketModel) => {
      const ticket = ticketModel.data;

      // load the performance and grab its related show & theatre
      const performanceModel = await PerformanceModel.load(ticket.performance_id!);
      const performance = performanceModel.data;

      return {
        ...ticket,
        performance,
      };
    })
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <Link href="/admin/tickets/create" className="page-action">
          + New Ticket
        </Link>
      </div>
      <TicketTable data={ticketsData} />
    </div>
  );
}
