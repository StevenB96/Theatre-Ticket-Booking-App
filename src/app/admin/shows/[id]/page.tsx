// app/admin/shows/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import EditShowForm from './EditShowForm';
import { getShowById } from '@/library/db/show';

interface EditShowPageProps {
  params: { id: string };
}

export default async function EditShowPage({ params }: EditShowPageProps): Promise<ReactNode> {
  const showIdFromUrl = parseInt(params.id, 10);
  const show = await getShowById(showIdFromUrl);

  if (!show) {
    return (
      <div>
        <h1>Show not found</h1>
        <p>No show exists with ID #{showIdFromUrl}.</p>
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