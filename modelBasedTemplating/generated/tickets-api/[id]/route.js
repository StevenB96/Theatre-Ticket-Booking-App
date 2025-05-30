import { NextResponse } from 'next/server';
import {
  getTicketById,
  updateTicket,
  deleteTicket
} from '@/lib/db/ticket';

export async function GET(_, { params }) {
  try {
    const { id: ticketId } = await params;
    const ticket = await getTicketById(Number(ticketId));
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }
    return NextResponse.json(ticket);
  } catch (err) {
    console.error('GET ticket error:', err);
    return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
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

    const { id: ticketId } = await params;
    const updated = await updateTicket(Number(ticketId), {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT ticket error:', err);

    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: ticketId } = await params;
    await deleteTicket(Number(ticketId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE ticket error:', err);
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
};