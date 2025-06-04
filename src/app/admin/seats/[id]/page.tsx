// app/admin/seats/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getSeatById } from '@/library/db/seat';

interface EditSeatPageProps {
  params: { id: string };
}

const EditSeatForm = dynamic(() => import('./EditSeatForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditSeatPage({
  params,
}: EditSeatPageProps): Promise<ReactNode> {
  const seatId = await Number(params.id);
  const seat = await getSeatById(seatId);

  if (!seat) {
    return (
      <div>
        <h1>Seat not found</h1>
        <p>No seat exists with ID #{seatId}.</p>
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