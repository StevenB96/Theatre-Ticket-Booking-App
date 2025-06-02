import dynamic from 'next/dynamic';

const CreateSeatForm = dynamic(
  () => import('./CreateSeatForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateSeatPage() {
  return (
    <div>
      <h1>Create Seat</h1>
      <CreateSeatForm />
    </div>
  );
};