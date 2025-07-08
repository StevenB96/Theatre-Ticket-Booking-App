'use client';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
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

const CustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
        <text
            x={x + width / 2}
            y={y - 6}
            textAnchor="middle"
            fill="#2D3748"
            fontSize={20}
            fontFamily="var(--font-playfair)"
        >
            {value}
        </text>
    );
};

export default function TheatreSeatsChart({ data }: Props) {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 80
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* 2) X-Axis */}
                    <XAxis
                        dataKey="name"
                        height={10}
                        interval={0}
                        tick={{
                            fill: '#4A5568',
                            fontSize: 14,
                            fontFamily: 'var(--font-source-sans-3)',
                        }}
                    />

                    {/* 4) Bars + Labels */}
                    <Bar
                        dataKey="seats"
                        fill="#3182ce"
                    >
                        <LabelList
                            content={<CustomBarLabel />}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
