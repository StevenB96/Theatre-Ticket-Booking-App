'use client';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    LabelList,
} from 'recharts';
import React from 'react';

interface RevenueData {
    label: string;
    total_revenue: number;
}

interface Props {
    data: RevenueData[];
}

const RotatedTick: React.FC<RotatedTickProps> = ({
    x = 0,
    y = 0,
    payload,
    rotateAngle = -45,
}) => {
    const [line1, line2] = payload.value.split(' | ');
    return (
        <g transform={`translate(${x}, ${y + 10})`}>
            <text
                x={0}
                y={0}
                dy={0}
                textAnchor="end"
                fill="#2D3748" /* tailwind gray-700 */
                fontSize={14}
                fontFamily="var(--font-source-sans-3)"
                transform={`rotate(${rotateAngle})`}
            >
                <tspan x={0} dy={0}>
                    {line1}
                </tspan>
                {line2 && (
                    <tspan x={0} dy="1.2em">
                        {line2}
                    </tspan>
                )}
            </text>
        </g>
    );
};

export default function RevenueByTHSChart({ data }: Props) {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                        height={90}
                        interval={0}
                        tick={<RotatedTick />}
                    />
                    <Bar dataKey="total_revenue" fill="#3182ce">
                        <LabelList
                            dataKey="total_revenue"
                            content={({ x, y, width, value }) => (
                                <text
                                    x={x + width / 2}
                                    y={y - 10}
                                    textAnchor="middle"
                                    className="fill-gray-700"
                                    fontSize={20}
                                    fontFamily="var(--font-playfair)"
                                >
                                    £{value}
                                </text>
                            )}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
