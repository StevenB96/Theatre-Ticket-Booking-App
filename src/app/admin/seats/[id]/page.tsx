// app/admin/seats/[id]/page.tsx

import React from 'react';
import SeatForm from '../SeatForm';
import { getSeatById } from '@/library/db/seat';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSeatPage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
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
      <div className="page-header">
        <h1 className="page-title">Edit Seat #{seat.id}</h1>
      </div>
      <SeatForm seat={seat} />
    </div>
  );
}
