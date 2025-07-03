'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export interface TheatreData { name: string; seats: number; }

interface Props { data: TheatreData[]; }

export default function TheatreSeatsChart({ data }: any) {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="seats" fill="#3182ce" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
