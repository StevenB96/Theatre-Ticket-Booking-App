import dynamic from 'next/dynamic';

const CreateShowForm = dynamic(
  () => import('./CreateShowForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateShowPage() {
  return (
    <div>
      <h1>Create Show</h1>
      <CreateShowForm />
    </div>
  );
};