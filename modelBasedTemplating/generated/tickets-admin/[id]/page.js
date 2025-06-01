import dynamic from 'next/dynamic';
import { getTicketById } from '@/library/db/ticket';

const EditTicketForm = dynamic(
  () => import('./EditTicketForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditTicketPage({ params }) {
  const { id: ticketId } = await params;
  const ticket = await getTicketById(ticketId)

  return (
    <div>
      <h1>Edit Ticket #{ticket.id}</h1>
      <EditTicketForm ticket={ticket} />
    </div>
  );
};