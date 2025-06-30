// app/admin/seats/create/page.tsx

import React from 'react';
import SeatForm from '../SeatForm';

export default function CreateSeatPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Seat</h1>
      </div>
      <SeatForm />
    </div>
  );
}
