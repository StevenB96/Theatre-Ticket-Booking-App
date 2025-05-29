import { NextResponse } from 'next/server';
import {
  getAllTheatres,
  createTheatre
} from '@/lib/db/theatre';

export async function GET() {
  try {
    const theatres = await getAllTheatres();
    return NextResponse.json(theatres);
  } catch (err) {
    console.error('GET theatres error:', err);
    return NextResponse.json({ error: 'Failed to fetch theatres' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, address } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newTheatre = await createTheatre({ name, address });
    return NextResponse.json(newTheatre, { status: 201 });
  } catch (err) {
    console.error('POST theatre error:', err);
    return NextResponse.json({ error: 'Failed to create theatre' }, { status: 500 });
  }
}
