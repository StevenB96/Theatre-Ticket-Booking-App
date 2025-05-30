// src/app/admin/theatres/create/page.js
import dynamic from 'next/dynamic';

const CreateTheatreForm = dynamic(
  () => import('./CreateTheatreForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateTheatrePage() {
  return (
    <div>
      <h1>Create Theatre</h1>
      <CreateTheatreForm />
    </div>
  );
};