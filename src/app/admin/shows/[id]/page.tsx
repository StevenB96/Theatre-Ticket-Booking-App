// app/admin/shows/[id]/page.tsx

import React from 'react';
import ShowForm from '../ShowForm';
import { getShowById } from '@/library/db/show';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShowPage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const show = await getShowById(id);

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
      <div className="page-header">
        <h1 className="page-title">Edit Show #{show.id}</h1>
      </div>
      <ShowForm show={show} />
    </div>
  );
}
