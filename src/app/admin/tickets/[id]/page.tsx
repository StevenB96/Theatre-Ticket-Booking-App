// app/admin/tickets/[id]/edit/page.tsx

import EditTicketForm from './EditTicketForm';
import { TicketModel } from '@/models/TicketModel';
import { PerformanceModel } from '@/models/PerformanceModel';
import { getAllUsers } from '@/library/db/user';
import { getAllSeats } from '@/library/db/seat';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTicketPage({ params }: PageProps) {
  const { id } = await params;
  const ticket = await TicketModel.load(parseInt(id, 10));
  const users = await getAllUsers();
  const seats = await getAllSeats();

  const performanceModels = await PerformanceModel.findAll();
  const performances = PerformanceModel.serialise(performanceModels);

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
      <EditTicketForm
        users={users}
        seats={seats}
        performances={performances}
        ticket={ticket.data}
      />
    </div>
  );
}
