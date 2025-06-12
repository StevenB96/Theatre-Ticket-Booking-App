// app/api/tickets/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getTicketById,
  updateTicketById,
  deleteTicketById,
} from '@/library/db/ticket';
import {
  Ticket,
  UpdateTicketInput
} from '@/types/ticket';

// GET /api/tickets/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const ticketIdFromUrl = parseInt(id, 10);
    const ticket = await getTicketById(ticketIdFromUrl);

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);
  } catch (err) {
    console.error('GET ticket error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    );
  }
}

// PUT /api/tickets/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdateTicketInput = await req.json();
    const { id } = await context.params;
    const ticketIdFromUrl = parseInt(id, 10);

    if (body.id !== ticketIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Ticket = await updateTicketById(ticketIdFromUrl, body);

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT ticket error:', err);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

// DELETE /api/tickets/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const ticketIdFromUrl = parseInt(id, 10);
    await deleteTicketById(ticketIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE ticket error:', err);

    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
};