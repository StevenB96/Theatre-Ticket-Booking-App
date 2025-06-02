import dynamic from 'next/dynamic';
import { getSeatById } from '@/library/db/seat';

const EditSeatForm = dynamic(
  () => import('./EditSeatForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditSeatPage({ params }) {
  const { id: seatId } = await params;
  const seat = await getSeatById(seatId)

  return (
    <div>
      <h1>Edit Seat #{seat.id}</h1>
      <EditSeatForm seat={seat} />
    </div>
  );
};