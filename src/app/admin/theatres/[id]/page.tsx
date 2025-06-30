// app/admin/theatres/[id]/page.tsx

import React from 'react';
import TheatreForm from '../TheatreForm';
import { getTheatreById } from '@/library/db/theatre';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTheatrePage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const theatre = await getTheatreById(id);

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
      <div className="page-header">
        <h1 className="page-title">Edit Theatre #{theatre.id}</h1>
      </div>
      <TheatreForm theatre={theatre} />
    </div>
  );
}
