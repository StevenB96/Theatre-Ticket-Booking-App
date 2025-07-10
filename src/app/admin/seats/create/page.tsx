// app/admin/seats/create/page.tsx

import React from 'react';
import SeatForm from '../SeatForm';
import { TheatreModel } from '@/models/TheatreModel';

export default async function CreateSeatPage() {
  const theatresData = (await TheatreModel.findAll()).map(t => t.data);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Seat</h1>
      </div>
      <SeatForm theatres={theatresData} />
    </div>
  );
}
