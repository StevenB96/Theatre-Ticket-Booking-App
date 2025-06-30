// app/admin/seats/page.tsx

import Link from 'next/link';
import SeatTable from './SeatTable';
import { getAllSeats } from '@/library/db/seat';

export default async function SeatsPage() {
  const seats = await getAllSeats();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Seats</h1>
        <Link href="/admin/seats/create" className="page-action">
          + New Seat
        </Link>
      </div>
      <SeatTable data={seats} />
    </div>
  );
}
