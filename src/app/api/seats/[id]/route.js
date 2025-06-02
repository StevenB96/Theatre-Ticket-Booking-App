import { NextResponse } from 'next/server';
import {
  getSeatById,
  updateSeat,
  deleteSeat
} from '@/library/db/seat';

export async function GET(_, { params }) {
  try {
    const { id: seatId } = await params;
    const seat = await getSeatById(Number(seatId));
    if (!seat) {
      return NextResponse.json({ error: 'Seat not found' }, { status: 404 });
    }
    return NextResponse.json(seat);
  } catch (err) {
    console.error('GET seat error:', err);
    return NextResponse.json({ error: 'Failed to fetch seat' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
  try {
    const {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_id,
      code,
      zone,
      status,
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */

    const { id: seatId } = await params;
    const updated = await updateSeat(Number(seatId), {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_id,
      code,
      zone,
      status,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT seat error:', err);

    return NextResponse.json({ error: 'Failed to update seat' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: seatId } = await params;
    await deleteSeat(Number(seatId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE seat error:', err);
    return NextResponse.json({ error: 'Failed to delete seat' }, { status: 500 });
  }
};