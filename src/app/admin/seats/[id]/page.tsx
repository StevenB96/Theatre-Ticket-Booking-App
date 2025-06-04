// app/admin/seats/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getSeatById } from '@/library/db/seat';

interface EditSeatPageProps {
  params: Promise<{ id: string }>;
}

const EditSeatForm = dynamic(() => import('./EditSeatForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditSeatPage({
  params,
}: EditSeatPageProps): Promise<ReactNode> {
  const { id } = await params;
  const seatIdFromUrl = parseInt(id, 10);
  const seat = await getSeatById(seatIdFromUrl);

  if (!seat) {
    return (
      <div>
        <h1>Seat not found</h1>
        <p>No seat exists with ID #{seatIdFromUrl}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Seat #{seat.id}</h1>
      <EditSeatForm seat={seat} />
    </div>
  );
};