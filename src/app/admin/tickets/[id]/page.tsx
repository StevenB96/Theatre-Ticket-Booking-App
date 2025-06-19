// app/admin/tickets/[id]/edit/page.tsx

import { getTicketById } from '@/library/db/ticket';
import EditTicketForm from './EditTicketForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTicketPage({ params }: PageProps) {
  const { id } = await params;
  const ticket = await getTicketById(parseInt(id, 10));

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
      <h1>Edit Ticket #{ticket.id}</h1>
      <EditTicketForm ticket={ticket} />
    </div>
  );
}
