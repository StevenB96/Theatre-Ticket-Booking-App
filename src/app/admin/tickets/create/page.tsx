// app/admin/tickets/create/page.tsx

import TicketForm from '../TicketForm';
import { PerformanceModel } from '@/models/PerformanceModel';
import { getAllUsers } from '@/library/db/user';
import { getAllSeats } from '@/library/db/seat';

export default async function CreateTicketPage() {
  const users = await getAllUsers();
  const seats = await getAllSeats();
  const performanceModels = await PerformanceModel.findAll();
  const performanceData = performanceModels.map(performance => performance.data);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create New Ticket</h1>
      </div>
      <TicketForm
        users={users}
        seats={seats}
        performances={performanceData}
      />
    </div>
  );
}
