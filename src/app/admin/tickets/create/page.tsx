// app/admin/tickets/create/page.tsx

import React from 'react';
import CreateTicketForm from './CreateTicketForm';
import { TicketModel } from '@/models/TicketModel';
import { PerformanceModel } from '@/models/PerformanceModel';
import { getAllUsers } from '@/library/db/user';
import { getAllSeats } from '@/library/db/seat';

export default async function CreateTicketPage() {
  const users = await getAllUsers();
  const seats = await getAllSeats();

  const performanceModels = await PerformanceModel.findAll();
  const performances = PerformanceModel.serialise(performanceModels);

  return (
    <div>
      <h1>Create Ticket</h1>
      <CreateTicketForm
        users={users}
        seats={seats}
        performances={performances}
      />
    </div>
  );
}
