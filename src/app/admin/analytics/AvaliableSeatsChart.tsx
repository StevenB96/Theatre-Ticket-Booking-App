// 'use client';

// import {
//     ResponsiveContainer,
//     RadarChart,
//     PolarGrid,
//     PolarAngleAxis,
//     PolarRadiusAxis,
//     Radar,
//     Tooltip,
//     Legend,
//     LabelList,
// } from 'recharts';

// // export interface PolarData {
// //     name: string;
// //     value: number;
// // }

// // interface Props {
// //     data: PolarData[];
// // }

// export default function AvaliableSeatsChart({ data }: any) {
// //     // 1) Sort descending by value
// //     const chartData = [
// //         {
// // seatsSoldByPercentage: [
// //                 {
// //                     zone: 'A',
// //                     percent: 25,
// //                 },
// //                 {
// //                     zone: 'B',
// //                     percent: 25,
// //                 },
// //             ]
// //         }
// //     ];

//     return (
//         <div className="w-full h-80">
//             <ResponsiveContainer>
//                 <RadarChart
//                     data={chartData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//                 >
//                     {/* 2) Grid */}
//                     <PolarGrid />

//                     {/* 3) Angle axis (the labels around the circle) */}
//                     <PolarAngleAxis
//                         dataKey="name"
//                         tick={{ fill: '#4A5568', fontSize: 12 }}
//                     />

//                     {/* 4) Radius axis (concentric circles) */}
//                     <PolarRadiusAxis
//                         angle={30}
//                         tickFormatter={(val) => `${val}`}
//                         axisLine={false}
//                         tick={{ fill: '#4A5568', fontSize: 10 }}
//                     />

//                     {/* 5) Radar shape */}
//                     <Radar
//                         dataKey="value"
//                         stroke="#3182ce"
//                         fill="#3182ce"
//                         fillOpacity={0.6}
//                     >
//                         <LabelList
//                             dataKey="value"
//                             position="top"
//                             formatter={(val) => `${val}`}
//                         />
//                     </Radar>

//                     {/* 6) Tooltip */}
//                     <Tooltip
//                         formatter={(value) => [`${value}`, 'Value']}
//                         itemStyle={{
//                             fontSize: '16px',
//                             fontFamily: 'var(--font-source-sans-3)',
//                         }}
//                     />

//                     {/* 7) Legend (optional) */}
//                     <Legend verticalAlign="top" height={36} />
//                 </RadarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }
