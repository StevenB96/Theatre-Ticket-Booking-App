// app/admin/shows/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getShowById } from '@/library/db/show';

interface EditShowPageProps {
  params: Promise<{ id: string }>;
}

const EditShowForm = dynamic(() => import('./EditShowForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditShowPage({
  params,
}: EditShowPageProps): Promise<ReactNode> {
  const { id } = await params;
  const showIdFromUrl = parseInt(id, 10);
  const show = await getShowById(showIdFromUrl);

  if (!show) {
    return (
      <div>
        <h1>Show not found</h1>
        <p>No show exists with ID #{showId}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Show #{show.id}</h1>
      <EditShowForm show={show} />
    </div>
  );
};