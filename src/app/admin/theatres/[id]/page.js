import dynamic from 'next/dynamic';
import { getTheatreById } from '@/library/db/theatre';

const EditTheatreForm = dynamic(
  () => import('./EditTheatreForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditTheatrePage({ params }) {
  const { id: theatreId } = await params;
  const theatre = await getTheatreById(theatreId);

  return (
    <div>
      <h1>Edit Theatre</h1>
      <EditTheatreForm theatre={theatre} />
    </div>
  );
};
