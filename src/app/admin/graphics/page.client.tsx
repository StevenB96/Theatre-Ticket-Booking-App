// app/admin/graphics/page.client.tsx

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import LeftRightNavigator from './LeftRightNavigator';

type Theatre = {
    id: number;
    name: string;
};

type Performance = {
    id: number;
    theatre_id: number;
    show: { name: string } | null;
    theatre: { name: string } | null;
};

type Seat = {
    id: number;
    theatre_id: number;
    zone: string;
    code: string;
};

type Ticket = {
    id: number;
    performance_id: number;
    seat_id: number;
    user_id: number;
};

interface GraphicsClientProps {
    theatreData: Theatre[];
    performanceData: Performance[];
    ticketData: Ticket[];
    seatData: Seat[];
}

export default function GraphicsClient({
    theatreData,
    performanceData,
    ticketData,
    seatData,
}: GraphicsClientProps) {
    // Selected IDs
    const [selectedTheatreId, setSelectedTheatreId] = useState<number>(
        theatreData[0]?.id ?? 0
    );
    const [selectedPerformanceId, setSelectedPerformanceId] = useState<number>(
        performanceData[0]?.id ?? 0
    );

    // 1. Only performances in the selected theatre
    const performances = useMemo(
        () =>
            performanceData.filter(
                (p) => p.theatre_id === selectedTheatreId
            ),
        [performanceData, selectedTheatreId]
    );

    useEffect(() => {
        if (performances.length > 0) {
            setSelectedPerformanceId(performances[0].id);
        } else {
            setSelectedPerformanceId(0);
        }
    }, [selectedTheatreId]);

    // 2. Seats in the selected theatre
    const seatsInTheatre = useMemo(
        () =>
            seatData.filter((seat) => seat.theatre_id === selectedTheatreId),
        [seatData, selectedTheatreId]
    );

    // 3. Tickets for the selected performance
    const ticketsForPerformance = useMemo(
        () =>
            ticketData.filter(
                (t) => t.performance_id === selectedPerformanceId
            ),
        [ticketData, selectedPerformanceId]
    );

    // 4. Tag each seat with `isBooked`
    const ticketTaggedSeats = useMemo(() => {
        return seatsInTheatre.map((seat) => {
            const isBooked = ticketsForPerformance.some(
                (ticket) =>
                    ticket.user_id !== null && ticket.seat_id === seat.id
            );
            return { ...seat, isBooked };
        });
    }, [seatsInTheatre, ticketsForPerformance]);

    // 5. Group tagged seats by zone
    const seatsByZone = useMemo(() => {
        return ticketTaggedSeats.reduce<Record<string, typeof ticketTaggedSeats>>(
            (grouped, seat) => {
                (grouped[seat.zone] ??= []).push(seat);
                return grouped;
            },
            {}
        );
    }, [ticketTaggedSeats]);

    // Handlers for navigators
    const handleTheatreChange = useCallback((t: Theatre) => {
        setSelectedTheatreId(t.id);
    }, []);
    const handlePerformanceChange = useCallback((p: Performance) => {
        setSelectedPerformanceId(p.id);
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <LeftRightNavigator
                name="Theatre"
                values={theatreData}
                selectedId={selectedTheatreId}
                onChange={handleTheatreChange}
                renderLabel={(t) => t.name}
            />

            <LeftRightNavigator
                name="Performance"
                values={performances}
                selectedId={selectedPerformanceId}
                onChange={handlePerformanceChange}
                renderLabel={(p) => `${p?.show?.name} – ${p?.theatre?.name}`}
            />

            <div className="flex flex-col gap-6">
                {Object.entries(seatsByZone).map(([zone, seats]) => (
                    <div key={zone} className="flex flex-col gap-2">
                        <h2 className="text-xl font-medium">{zone}</h2>
                        <div className="flex flex-row gap-2">
                            {seats.map((seat) => (
                                <p
                                    key={seat.id}
                                    className={seat.isBooked ? 'font-bold' : undefined}
                                >
                                    {seat.code}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
