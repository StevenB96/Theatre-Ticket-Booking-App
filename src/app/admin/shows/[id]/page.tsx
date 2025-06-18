// app/admin/shows/[id]/edit/page.tsx

import EditShowForm from './EditShowForm';
import { getShowById } from '@/library/db/show';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShowPage({ params }: PageProps) {
  const { id } = await params;
  const show = await getShowById(parseInt(id, 10));

  if (!show) {
    return (
      <div>
        <h1>Show not found</h1>
        <p>No show exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Show #{show.id}</h1>
      <EditShowForm show={show} />
    </div>
  );
}