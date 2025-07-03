// app/admin/tickets/[id]/page.tsx

import TicketForm from '../TicketForm';
import { TicketModel } from '@/models/TicketModel';
import { PerformanceModel } from '@/models/PerformanceModel';
import { getAllUsers } from '@/library/db/user';
import { getAllSeats } from '@/library/db/seat';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTicketPage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const ticket = await TicketModel.load(id);
  const users = await getAllUsers();
  const seats = await getAllSeats();
  const performanceModels = await PerformanceModel.findAll();
  const performanceData = performanceModels.map(performance => performance.data);

  if (!ticket) {
    return (
      <div>
        <h1>Ticket not found</h1>
        <p>No ticket exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit Ticket #{ticket.data.id}</h1>
      </div>
      <TicketForm
        users={users}
        seats={seats}
        performances={performanceData}
        ticket={ticket.data}
      />
    </div>
  );
}