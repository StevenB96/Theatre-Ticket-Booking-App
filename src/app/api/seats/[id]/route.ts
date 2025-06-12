// app/api/seats/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getSeatById,
  updateSeatById,
  deleteSeatById,
} from '@/library/db/seat';
import {
  Seat,
  UpdateSeatInput
} from '@/types/seat';

// GET /api/seats/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const seatIdFromUrl = parseInt(id, 10);
    const seat = await getSeatById(seatIdFromUrl);

    if (!seat) {
      return NextResponse.json(
        { error: 'Seat not found' },
        { status: 404 }
      );
    }

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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdateSeatInput = await req.json();
    const { id } = await context.params;
    const seatIdFromUrl = parseInt(id, 10);

    if (body.id !== seatIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Seat = await updateSeatById(seatIdFromUrl, body);

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
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const seatIdFromUrl = parseInt(id, 10);
    await deleteSeatById(seatIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE seat error:', err);
    return NextResponse.json(
      { error: 'Failed to delete seat' },
      { status: 500 }
    );
  }
};