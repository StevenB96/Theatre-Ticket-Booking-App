'use client';

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

type PieLabelProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    value: number;
};

export const PieLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    value = 0,
}: Partial<PieLabelProps>) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const text = `${value}%`;
    const fontSize = 14;
    const padding = 4;
    const approxCharWidth = 7;
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
    '#CC4F6A',
    '#2A7ABF',
    '#CCAA45',
    '#3B9797',
    '#7A4DB3',
    '#CC7D33',
    '#00917C',
    '#CC5353',
    '#B28E00',
    '#5EA3CC',
];

const PieChartCard = ({ group: { label, data } }: PieChartCardProps) => (
    <div className="w-full h-80 bg-white p-4 rounded-lg">
        <h1 className="seat-sales-pie-chart-card-title">{label}</h1>
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

const SeatSalesByPriceChart = ({ data }: SeatSalesByPriceChartProps) => {
    if (!data?.length) {
        return <p>No data available</p>;
    }

    return (
        <div className="seat-sales-outer">
            {data.map(group => (
                <PieChartCard key={group.performance_id} group={group} />
            ))}
        </div>
    );
};

export default SeatSalesByPriceChart;
