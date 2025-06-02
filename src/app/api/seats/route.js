import { NextResponse } from 'next/server';
import {
  getAllSeats,
  createSeat
} from '@/library/db/seat';

export async function GET() {
  try {
    const seats = await getAllSeats();
    return NextResponse.json(seats);
  } catch (err) {
    console.error('GET seats error:', err);
    return NextResponse.json({ error: 'Failed to fetch seats' }, { status: 500 });
  }
};

export async function POST(req) {
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

    const newSeat = await createSeat({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_id,
      code,
      zone,
      status,
    });

    return NextResponse.json(newSeat, { status: 201 });
  } catch (err) {
    console.error('POST seat error:', err);
    return NextResponse.json({ error: 'Failed to create seat' }, { status: 500 });
  }
};