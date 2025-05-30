import dynamic from 'next/dynamic';
import { getTheatreById } from '@/lib/db/theatre';

const EditTheatreForm = dynamic(
  () => import('./EditTheatreForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditTheatrePage({ params }) {
  const { id: theatreId } = await params;
  const theatre = await getTheatreById(theatreId);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Theatre</h1>
      <EditTheatreForm theatre={theatre} />
    </div>
  );
}
