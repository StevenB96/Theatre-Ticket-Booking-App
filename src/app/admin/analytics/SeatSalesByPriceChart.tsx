'use client';

import React from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

// components/PieLabel.tsx
interface PieLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    value: number;
}

export const PieLabel: React.FC<PieLabelProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
}) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const text = `${value}%`;
    const fontSize = 14;
    const padding = 4;
    const approxCharWidth = 7; // tweak if needed
    const textWidth = text.length * approxCharWidth;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect
                x={-textWidth / 2 - padding}
                y={-fontSize / 2 - padding / 2}
                width={textWidth + padding * 2}
                height={fontSize + padding}
                fill="white"
                rx={4}
                ry={4}
            />
            <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#2D3748"
                fontSize={fontSize}
                fontFamily="var(--font-source-sans-3)"
            >
                {text}
            </text>
        </g>
    );
};

export interface PolarData {
    group: string;
    percentage: number;
}

export interface SalesGroup {
    performance_id: number;
    label: string | undefined;
    data: PolarData[];
}

interface PieChartCardProps {
    group: SalesGroup;
}

const COLORS = [
    '#CC4F6A', // dark pink (darker #FF6384)
    '#2A7ABF', // dark bright blue (#36A2EB)
    '#CCAA45', // dark yellow (#FFCE56)
    '#3B9797', // dark teal (#4BC0C0)
    '#7A4DB3', // dark purple (#9966FF)
    '#CC7D33', // dark orange (#FF9F40)
    '#00917C', // dark greenish cyan (#00C49F)
    '#CC5353', // dark coral (#FF6B6B)
    '#B28E00', // dark gold (#FFD700)
    '#5EA3CC', // dark sky blue (#7FDBFF)
];

const PieChartCard: React.FC<PieChartCardProps> = ({ group: { label, data } }) => (
    <div className="w-full h-80 bg-white p-4 rounded-lg">
        <h1 className="text-center mb-2 whitespace-pre-wrap text-[20px] fill-gray-700">{label}</h1>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="percentage"
                    nameKey="group"
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    label={(props) => <PieLabel {...props} value={props.value} />}
                >
                    {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={120} wrapperStyle={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-source-sans-3)',
                    color: '#2D3748',
                }} />
            </PieChart>
        </ResponsiveContainer>
    </div>
);


interface SeatSalesByPriceChartProps {
    data: SalesGroup[];
}

const SeatSalesByPriceChart: React.FC<SeatSalesByPriceChartProps> = ({ data }) => {
    if (!data?.length) {
        return <p>No data available</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-30">
            {data.map(group => (
                <PieChartCard key={group.performance_id} group={group} />
            ))}
        </div>
    );
};

export default SeatSalesByPriceChart;
