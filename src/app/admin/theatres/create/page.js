// src/app/admin/theatres/create/page.js
import dynamic from 'next/dynamic';

const CreateTheatreForm = dynamic(
  () => import('./CreateTheatreForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateTheatrePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Theatre</h1>
      <CreateTheatreForm />
    </div>
  );
};