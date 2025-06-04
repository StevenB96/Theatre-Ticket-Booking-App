// app/api/tickets/route.ts
import { NextResponse } from 'next/server';
import {
  getAllTickets,
  createTicket,
} from '@/library/db/ticket';
import {
  Ticket,
  CreateTicketInput,
} from '@/types/ticket';

// GET /api/tickets
export async function GET() {
  try {
    const tickets: Ticket[] = await getAllTickets();
    return NextResponse.json(tickets);
  } catch (err) {
    console.error('GET tickets error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

// POST /api/tickets
export async function POST(req: Request) {
  try {
    const body: CreateTicketInput = await req.json();

    const newTicket: Ticket = await createTicket(body);

    return NextResponse.json(newTicket, { status: 201 });
  } catch (err) {
    console.error('POST ticket error:', err);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  };
};