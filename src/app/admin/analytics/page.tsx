// <-- no "use client": this is a server component
import TheatreSeatsChart from '@/app/admin/analytics/TheatreSeatsChart';
import { TheatreModel } from '@/models/TheatreModel';

export default async function Page() {
    const theatreModels = await TheatreModel.findAll();
    const chartData = await Promise.all(
        theatreModels.map(async (m) => ({
            name: m.data.name,
            seats: await m.numberOfSeats(),
        }))
    );

    return (
        <div className="p-8">
            <h1 className="text-2xl font-playfair mb-4">Theatre Seat Counts</h1>
            <div className="bg-white rounded-md shadow p-6">
                <TheatreSeatsChart data={chartData} />
            </div>
        </div>
    );
}
