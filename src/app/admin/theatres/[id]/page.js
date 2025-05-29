import EditTheatreForm from './EditTheatreForm';
import { getTheatreById } from '@/lib/db/theatre';

export default async function EditTheatrePage({ params }) {
  const theatre = await getTheatreById(params.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Theatre</h1>
      <EditTheatreForm theatre={theatre} />
    </div>
  );
}
