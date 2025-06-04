// app/admin/tickets/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateTicketForm = dynamic(
  () => import('./CreateTicketForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateTicketPage(): ReactNode {
  return (
    <div>
      <h1>Create Ticket</h1>
      <CreateTicketForm />
    </div>
  );
};