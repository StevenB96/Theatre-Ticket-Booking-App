// app/admin/theatres/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getTheatreById } from '@/library/db/theatre';

interface EditTheatrePageProps {
  params: Promise<{ id: string }>;
}

const EditTheatreForm = dynamic(() => import('./EditTheatreForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditTheatrePage({
  params,
}: EditTheatrePageProps): Promise<ReactNode> {
  const { id } = await params;
  const theatreIdFromUrl = parseInt(id, 10);
  const theatre = await getTheatreById(theatreIdFromUrl);

  if (!theatre) {
    return (
      <div>
        <h1>Theatre not found</h1>
        <p>No theatre exists with ID #{theatreId}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Theatre #{theatre.id}</h1>
      <EditTheatreForm theatre={theatre} />
    </div>
  );
};