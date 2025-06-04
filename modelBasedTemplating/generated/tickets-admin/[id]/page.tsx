// app/admin/tickets/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getTicketById } from '@/library/db/ticket';

interface EditTicketPageProps {
  params: Promise<{ id: string }>;
}

const EditTicketForm = dynamic(() => import('./EditTicketForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditTicketPage({
  params,
}: EditTicketPageProps): Promise<ReactNode> {
  const { id } = await params;
  const ticketIdFromUrl = parseInt(id, 10);
  const ticket = await getTicketById(ticketIdFromUrl);

  if (!ticket) {
    return (
      <div>
        <h1>Ticket not found</h1>
        <p>No ticket exists with ID #{ticketId}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Ticket #{ticket.id}</h1>
      <EditTicketForm ticket={ticket} />
    </div>
  );
};