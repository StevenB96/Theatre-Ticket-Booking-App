// app/admin/seats/[id]/edit/page.tsx
'use client';

import React, { ReactNode } from 'react';
import EditSeatForm from './EditSeatForm';
import { getSeatById } from '@/library/db/seat';

interface EditSeatPageProps {
  params: { id: string };
}

export default async function EditSeatPage({ params }: EditSeatPageProps): Promise<ReactNode> {
  const id = parseInt(params.id, 10);
  const seat = await getSeatById(id);

  if (!seat) {
    return (
      <div>
        <h1>Seat not found</h1>
        <p>No seat exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Seat #{seat.id}</h1>
      <EditSeatForm seat={seat}  />
    </div>
  );
}
