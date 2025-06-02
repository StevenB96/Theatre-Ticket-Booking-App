import { NextResponse } from 'next/server';
import {
  getAllTickets,
  createTicket
} from '@/library/db/ticket';

export async function GET() {
  try {
    const tickets = await getAllTickets();
    return NextResponse.json(tickets);
  } catch (err) {
    console.error('GET tickets error:', err);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
};

export async function POST(req) {
  try {
    const {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      user_id,
      seat_id,
      performance_id,
      price,
      status,
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */

    const newTicket = await createTicket({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      user_id,
      seat_id,
      performance_id,
      price,
      status,
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (err) {
    console.error('POST ticket error:', err);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
};