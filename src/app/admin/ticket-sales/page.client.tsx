// app/admin/graphics/page.client.tsx

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { TicketCheck, Ticket } from 'lucide-react';
import LeftRightNavigator from './LeftRightNavigator';
import { PerformanceWithRelations } from '@/types/performance';
import { TicketWithRelations } from '@/types/ticket';
import { Theatre } from '@/types/theatre';
import { Seat } from '@/types/seat';

type TaggedSeat = Seat & { isBooked: boolean };

interface GraphicsClientProps {
    theatreData: Theatre[];
    performanceData: PerformanceWithRelations[];
    ticketData: TicketWithRelations[];
    seatData: Seat[];
}

function CustomTicket({
    taggedSeat
}:
    {
        taggedSeat: TaggedSeat,
    }) {
    return (
        <div
            key={taggedSeat.id}
            className={`
        inline-flex flex-none items-center gap-2 px-4 py-2 border rounded-2xl shadow-sm transition
        ${taggedSeat.isBooked
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-white text-gray-800 border-gray-300'}
      `}
        >
            {taggedSeat.isBooked ? (
                <TicketCheck className="w-4 h-4" />
            ) : (
                <Ticket className="w-4 h-4" />
            )}
            <p className="text-sm">{taggedSeat.code}</p>
        </div>
    );
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
    }, [selectedTheatreId, performances]);

    // 2. Seats in the selected theatre
    const seatsInTheatre = useMemo(
        () =>
            seatData.filter((s: Seat) => s.theatre_id === selectedTheatreId),
        [seatData, selectedTheatreId]
    );

    // 3. Tickets for the selected performance
    const ticketsForPerformance = useMemo(
        () =>
            ticketData.filter(
                (tk: TicketWithRelations) => tk.performance_id === selectedPerformanceId
            ),
        [ticketData, selectedPerformanceId]
    );

    // 4. Tag each seat with `isBooked`
    const ticketTaggedSeats: (Seat & { isBooked: boolean })[] = useMemo(() => {
        return seatsInTheatre.map((se: Seat) => {
            const isBooked = ticketsForPerformance.some(
                (tk: TicketWithRelations) =>
                    tk.user_id !== null && tk.seat_id === se.id
            );
            return { ...se, isBooked };
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
    const handlePerformanceChange = useCallback((p: PerformanceWithRelations) => {
        setSelectedPerformanceId(p.id);
    }, []);

    const generatePerformanceLabel = (p: PerformanceWithRelations) => {
        const showName = p?.show?.name ?? '';
        const date = new Date(p.start_time).toLocaleDateString('en-GB', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
        const typeLabel =
            p?.type === 1
                ? 'evening'
                : p?.type === 0
                    ? 'matinee'
                    : 'unknown';
        const performancelabel = `${showName} ${typeLabel} performance on the ${date}`;

        return performancelabel;
    };

    return (
        <div className="flex flex-col gap-8">
            <LeftRightNavigator
                name="Theatre"
                values={theatreData}
                selectedId={selectedTheatreId}
                onChange={handleTheatreChange}
                renderLabel={(th) => th.name}
            />

            <LeftRightNavigator
                name="Performance"
                values={performances}
                selectedId={selectedPerformanceId}
                onChange={handlePerformanceChange}
                renderLabel={generatePerformanceLabel}
            />

            <div className="flex flex-col gap-6">
                {Object.entries(seatsByZone).map(([
                    zone,
                    taggedSeats
                ]: [
                        string,
                        TaggedSeat[]
                    ]
                ) => (
                    <div key={zone} className="flex flex-col gap-3">
                        <hr />
                        <div className="graphic-zone-container">
                            <h1 className="graphic-zone-title">{zone}:
                            </h1>
                            <div className="graphic-zone-grid">
                                {taggedSeats.map((ts: TaggedSeat) => (
                                    <CustomTicket
                                        key={ts.id}
                                        taggedSeat={ts} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
