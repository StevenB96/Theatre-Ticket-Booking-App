import dynamic from 'next/dynamic';

const CreateTicketForm = dynamic(
  () => import('./CreateTicketForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateTicketPage() {
  return (
    <div>
      <h1>Create Ticket</h1>
      <CreateTicketForm />
    </div>
  );
};