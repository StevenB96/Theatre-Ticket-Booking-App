// app/admin/theatres/[id]/edit/page.tsx

import { getTheatreById } from '@/library/db/theatre';
import EditTheatreForm from './EditTheatreForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTheatrePage({ params }: PageProps) {
  const { id } = await params;
  const theatre = await getTheatreById(parseInt(id, 10));

  if (!theatre) {
    return (
      <div>
        <h1>Theatre not found</h1>
        <p>No theatre exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Theatre #{theatre.id}</h1>
      <EditTheatreForm theatre={theatre} />
    </div>
  );
}
