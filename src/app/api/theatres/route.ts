// app/api/theatres/route.ts
import { NextResponse } from 'next/server';
import {
  getAllTheatres,
  createTheatre,
} from '@/library/db/theatre';
import {
  Theatre,
  CreateTheatreInput,
} from '@/types/theatre';

// GET /api/theatres
export async function GET() {
  try {
    const theatres: Theatre[] = await getAllTheatres();
    return NextResponse.json(theatres);
  } catch (err) {
    console.error('GET theatres error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch theatres' },
      { status: 500 }
    );
  }
}

// POST /api/theatres
export async function POST(req: Request) {
  try {
    const body: CreateTheatreInput = await req.json();

    const newTheatre: Theatre = await createTheatre(body);

    return NextResponse.json(newTheatre, { status: 201 });
  } catch (err) {
    console.error('POST theatre error:', err);
    return NextResponse.json(
      { error: 'Failed to create theatre' },
      { status: 500 }
    );
  };
};