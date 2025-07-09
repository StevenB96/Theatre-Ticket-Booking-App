// app/admin/graphics/page.tsx

import { TicketModel } from '@/models/TicketModel';
import { TheatreModel } from '@/models/TheatreModel';
import { PerformanceModel } from '@/models/PerformanceModel';
import LeftRightNavigator from '@/app/admin/graphics/LeftRightNavigator';

export default async function GraphicsPage() {
  const ticketModels = await TicketModel.findAll();
  const ticketData = ticketModels.map(tk => tk.data);

  const theatreModels = await TheatreModel.findAll();
  const theatreData = theatreModels.map(th => th.data);

  const performanceModels = await PerformanceModel.findAll();
  const performanceData = performanceModels.map(p => p.data);

  console.log({ performanceData });

  return (
    <div className="flex flex-col gap-3">
      <LeftRightNavigator name={'Theatre'} values={theatreData} />
      <LeftRightNavigator name={'Performance'} values={performanceData} />
    </div>
  );
}
