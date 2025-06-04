// app/admin/seats/page.tsx
import Link from 'next/link';
import SeatTable from './SeatTable.client';
import { getAllSeats } from '@/library/db/seat';

export default async function SeatsPage() {
  const seats = await getAllSeats();

  return (
    <div>
      <h1>Seats</h1>
      <p>
        <Link href="/admin/seats/create">+ New Seat</Link>
      </p>
      <SeatTable data={seats} />
    </div>
  );
};