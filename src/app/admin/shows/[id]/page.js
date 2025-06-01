import dynamic from 'next/dynamic';
import { getShowById } from '@/library/db/show';

const EditShowForm = dynamic(
  () => import('./EditShowForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditShowPage({ params }) {
  const { id: showId } = await params;
  const show = await getShowById(showId)

  return (
    <div>
      <h1>Edit Show #{show.id}</h1>
      <EditShowForm show={show} />
    </div>
  );
};