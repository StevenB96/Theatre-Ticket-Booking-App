// app/admin/graphics/page.tsx

import { TicketModel } from '@/models/TicketModel';
import { TheatreModel } from '@/models/TheatreModel';
import { PerformanceModel } from '@/models/PerformanceModel';
import { SeatModel } from '@/models/SeatModel';
import GraphicsClient from '@/app/admin/ticket-sales/page.client';

export const revalidate = 0;

export default async function GraphicsPage() {
  // Fetch all data server-side
  const [
    seatModels,
    ticketModels,
    theatreModels,
    performanceModels,
  ] = await Promise.all([
    SeatModel.findAll(),
    TicketModel.findAll(),
    TheatreModel.findAll(),
    PerformanceModel.findAll(),
  ]);

  const seatData = seatModels.map((se) => se.data);
  const ticketData = ticketModels.map((tk) => tk.data);
  const theatreData = theatreModels.map((th) => th.data);
  const performanceData = performanceModels.map((p) => p.data);

  return (
    <div className="p-6">
      {/* Client component handles selection state */}
      <GraphicsClient
        theatreData={theatreData}
        performanceData={performanceData}
        seatData={seatData}
        ticketData={ticketData}
      />
    </div>
  );
}
