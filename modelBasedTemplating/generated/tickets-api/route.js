import { NextResponse } from 'next/server';
import {
  getAllTickets,
  createTicket
} from '@/lib/db/ticket';

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
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */

    const newShow = await createShow({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
    });

    return NextResponse.json(newShow, { status: 201 });
  } catch (err) {
    console.error('POST show error:', err);
    return NextResponse.json({ error: 'Failed to create show' }, { status: 500 });
  }
};