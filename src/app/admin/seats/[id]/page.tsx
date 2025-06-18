// app/admin/seats/[id]/edit/page.tsx

import { getSeatById } from '@/library/db/seat';
import EditSeatForm from './EditSeatForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSeatPage({ params }: PageProps) {
  const { id } = await params;
  const seat = await getSeatById(parseInt(id, 10));

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
      <EditSeatForm seat={seat} />
    </div>
  );
}
