import TheatresBySeatsChart from '@/app/admin/analytics/TheatresBySeatsChart';
import RevenueByTHS from '@/app/admin/analytics/RevenueByTHSChart';
import SeatSalesByPriceChart from '@/app/admin/analytics/SeatSalesByPriceChart';
import { TheatreModel } from '@/models/TheatreModel';
import { ShowModel } from '@/models/ShowModel';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function AnalyticsPage() {
    // Seats Chart
    const theatreModels = await TheatreModel.findAll();
    let theatresBySeatsData = await Promise.all(
        theatreModels.map(async (m) => ({
            name: m.data.name,
            seats: await m.getSeatCount(),
        }))
    );
    theatresBySeatsData = theatresBySeatsData.sort((a, b) => b.seats - a.seats).slice(0, 5);

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
                    revenue: d.revenue,
                    label: trimLabel(`${d.show_name} | ${d.theatre_name}`, 60),
                }));
            })
        )
    ).flat().sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    // Sales Chart
    const performanceModels = await PerformanceModel.findAll();
    let seatSalesByPriceData = (
        await Promise.all(
            performanceModels.map(async (performance) => {
                const seatSalesByPrice = await performance.getSeatSalesByPricePercentage();
                const showName = performance?.data?.show?.name ?? '';
                const theatreName = performance?.data?.theatre?.name ?? '';
                const time = new Date(performance.data.start_time).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                const date = new Date(performance?.data.start_time).toLocaleDateString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric'
                });
                const typeLabel =
                    performance.data.type === 1
                        ? 'evening'
                        : performance.data.type === 0
                            ? 'matinee'
                            : 'unknown';
                const label = `${showName} (${theatreName}) ${typeLabel} performance at ${time} on the ${date}`;

                return {
                    performance_id: performance.data.id,
                    label,
                    data: seatSalesByPrice.map(d => {
                        if (typeof d.group === 'number') {
                            d.group = `£${d.group}`
                        }
                        return d;
                    }),
                };
            }))
    ).sort((a, b) => {
        const aUnsold = a.data.find(d => d.group === 'Unsold')?.percentage ?? 0;
        const bUnsold = b.data.find(d => d.group === 'Unsold')?.percentage ?? 0;
        if (aUnsold === 0) {
            return 1;
        }
        if (bUnsold === 0) {
            return -1;
        }
        return aUnsold - bUnsold;
    }).slice(0, 8);

    return (
        <div className="p-8">
            <div className="analytics-chart-container">
                <h1 className="analytics-chart-title">Top {theatresBySeatsData.length} Theatres By Seats</h1>
                <br />
                <TheatresBySeatsChart data={theatresBySeatsData} />
            </div>
            <div className="analytics-chart-container">
                <h1 className="analytics-chart-title">Top {revenueByTHSData.length} Shows By Revenue</h1>
                <br />
                <RevenueByTHS data={revenueByTHSData} />
            </div>
            <div className="analytics-chart-container">
                <h1 className="analytics-chart-title">Top {seatSalesByPriceData.length} Performances That Are Selling Out</h1>
                <br />
                <SeatSalesByPriceChart data={seatSalesByPriceData} />
            </div>
        </div>
    );
}
