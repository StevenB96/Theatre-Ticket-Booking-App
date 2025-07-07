import TheatresBySeatsChart from '@/app/admin/analytics/TheatresBySeatsChart';
import RevenueByTHS from '@/app/admin/analytics/RevenueByTHSChart';
import { TheatreModel } from '@/models/TheatreModel';
import { ShowModel } from '@/models/ShowModel';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function Page() {
    // Seats Chart
    const theatreModels = await TheatreModel.findAll();
    let theatresBySeatsData = await Promise.all(
        theatreModels.map(async (m) => ({
            name: m.data.name,
            seats: await m.getSeatCount(),
        }))
    );
    theatresBySeatsData = theatresBySeatsData.slice(0, 5);

    const trimLabel = (text: string, limit: number = 10): string => {
        return text.length > limit ? text.substring(0, limit) + '…' : text;
    };

    // Show Chart
    const showModels = await ShowModel.findAll();
    let revenueByTHSData = (
        await Promise.all(
            showModels.map(async (show) => {
                const data = await show.getTicketSalesData();
                return data.map(d => ({
                    total_revenue: d.total_revenue,
                    label: trimLabel(`${d.show_name} | ${d.theatre_name}`, 60),
                }));
            })
        )
    ).flat();
    revenueByTHSData = revenueByTHSData.slice(0, 5);

    const performanceModels = await PerformanceModel.findAll();

    performanceModels.map(performance => performance.getSeatSalesByPricePercentage());

    return (
        <div className="p-8">
            <div className="bg-white rounded-md shadow p-6">
                <h1 className="text-2xl font-playfair mb-4">Top 3 Theatres By Seats</h1>
                <TheatresBySeatsChart data={theatresBySeatsData} />
            </div>
            <div className="bg-white rounded-md shadow p-6">
                <h1 className="text-2xl font-playfair mb-4">Top 3 Shows By Revenue</h1>
                <RevenueByTHS data={revenueByTHSData} />
            </div>
            <div className="bg-white rounded-md shadow p-6">
                <h1 className="text-2xl font-playfair mb-4">Top 3 Performances That Are Selling Out</h1>
                <RevenueByTHS data={revenueByTHSData} />
            </div>
        </div>
    );
}
