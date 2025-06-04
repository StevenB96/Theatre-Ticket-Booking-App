// app/api/seats/route.ts
import { NextResponse } from 'next/server';
import {
  getAllSeats,
  createSeat,
} from '@/library/db/seat';
import {
  Seat,
  CreateSeatInput,
} from '@/types/seat';

// GET /api/seats
export async function GET() {
  try {
    const seats: Seat[] = await getAllSeats();
    return NextResponse.json(seats);
  } catch (err) {
    console.error('GET seats error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch seats' },
      { status: 500 }
    );
  }
}

// POST /api/seats
export async function POST(req: Request) {
  try {
    const body: CreateSeatInput = await req.json();

    const newSeat: Seat = await createSeat(body);

    return NextResponse.json(newSeat, { status: 201 });
  } catch (err) {
    console.error('POST seat error:', err);
    return NextResponse.json(
      { error: 'Failed to create seat' },
      { status: 500 }
    );
  };
};