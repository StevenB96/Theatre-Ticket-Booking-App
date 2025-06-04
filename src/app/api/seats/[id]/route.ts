// app/api/seats/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getSeatById,
  updateSeat,
  deleteSeat,
} from '@/library/db/seat';
import {
  Seat,
  UpdateSeatInput
} from '@/types/seat';

// GET /api/seats/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const seatId = await Number(params.id);
    const seat = await getSeatById(seatId);

    if (!seat) {
      return NextResponse.json(
        { error: 'Seat not found' },
        { status: 404 }
      );
    };

    return NextResponse.json(seat);
  } catch (err) {
    console.error('GET seat error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch seat' },
      { status: 500 }
    );
  }
}

// PUT /api/seats/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateSeatInput = await req.json();

    const seatIdFromUrl = await Number(params.id);
    if (body.id !== seatIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Seat = await updateSeat(seatIdFromUrl, body);

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT seat error:', err);
    return NextResponse.json(
      { error: 'Failed to update seat' },
      { status: 500 }
    );
  }
}

// DELETE /api/seats/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const seatId = await Number(params.id);
    await deleteSeat(seatId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE seat error:', err);
    return NextResponse.json(
      { error: 'Failed to delete seat' },
      { status: 500 }
    );
  }
};