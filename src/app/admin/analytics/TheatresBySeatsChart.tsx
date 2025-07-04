'use client';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LabelList,
} from 'recharts';

export interface TheatreData {
    name: string;
    seats: number;
}

interface Props {
    data: TheatreData[];
}

export default function TheatreSeatsChart({ data }: Props) {
    // 1) Sort descending by seat count
    const chartData = [...data].sort((a, b) => b.seats - a.seats);

    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X-Axis */}
                    <XAxis
                        dataKey="name"
                        height={60}
                        interval={0}
                        tick={{
                            fill: '#4A5568',
                            fontSize: 12
                        }}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        formatter={value => [`${value}`, 'Seats']}
                        itemStyle={{
                            fontSize: '16px',
                            fontFamily: 'var(--font-source-sans-3)',
                        }}
                    />

                    {/* Bars + Labels */}
                    <Bar dataKey="seats" fill="#3182ce">
                        <LabelList
                            dataKey="seats"
                            position="top"
                            formatter={value => `${value}`}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
