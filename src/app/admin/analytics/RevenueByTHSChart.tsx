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

interface RevenueData {
    label: string;
    total_revenue: number;
}

interface Props {
    data: RevenueData[];
}

export default function RevenueByTHSChart({ data }: Props) {
    // 1) Coerce strings to numbers once
    const chartData = data.map((d) => ({
        label: d.label,
        total_revenue: d.total_revenue,
    })).sort((a, b) => b.total_revenue - a.total_revenue);

    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* 2) Custom multi-line, rotated X-axis ticks */}
                    <XAxis
                        dataKey="label"
                        height={70}
                        interval={0}
                        tick={({ x, y, payload }) => {
                            const [line1, line2] = (payload.value as string).split(' | ');
                            const translateY = y + 10;
                            return (
                                <g transform={`translate(${x},${translateY}) rotate(-45)`}>
                                    <text
                                        textAnchor="end"
                                        fill="#4A5568"
                                        fontSize={12}
                                    >
                                        <tspan x={0} dy={0}>{line1}</tspan>
                                        {line2 && <tspan x={0} dy="1.2em">{line2}</tspan>}
                                    </text>
                                </g>
                            );
                        }}
                    />

                    {/* 3) Tooltip with £ formatting */}
                    <Tooltip
                        labelFormatter={(label: string) => `${label.replace(" | ", " - ")}`}
                        formatter={(value, name, props) => {
                            return [
                                `£${value}`,
                                'Total Revenue',
                            ];
                        }}
                        itemStyle={{
                            fontSize: '16px',
                            fontFamily: 'var(--font-source-sans-3)',
                        }}
                    />

                    {/* 4) Bars + labels */}
                    <Bar dataKey="total_revenue" fill="#3182ce">
                        <LabelList
                            dataKey="total_revenue"
                            position="top"
                            formatter={value => `£${value}`}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
