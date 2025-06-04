// app/api/shows/route.ts
import { NextResponse } from 'next/server';
import {
  getAllShows,
  createShow,
} from '@/library/db/show';
import {
  Show,
  CreateShowInput,
} from '@/types/show';

// GET /api/shows
export async function GET() {
  try {
    const shows: Show[] = await getAllShows();
    return NextResponse.json(shows);
  } catch (err) {
    console.error('GET shows error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch shows' },
      { status: 500 }
    );
  }
}

// POST /api/shows
export async function POST(req: Request) {
  try {
    const body: CreateShowInput = await req.json();

    const newShow: Show = await createShow(body);

    return NextResponse.json(newShow, { status: 201 });
  } catch (err) {
    console.error('POST show error:', err);
    return NextResponse.json(
      { error: 'Failed to create show' },
      { status: 500 }
    );
  };
};