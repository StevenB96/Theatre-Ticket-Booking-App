import { NextResponse } from 'next/server';
import {
  getAllShows,
  createShow
} from '@/lib/db/show';

export async function GET() {
  try {
    const shows = await getAllShows();
    return NextResponse.json(shows);
  } catch (err) {
    console.error('GET shows error:', err);
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
};

export async function POST(req) {
  try {
    const {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      name,
      status,
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newShow = await createShow({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      name,
      status,
    });

    return NextResponse.json(newShow, { status: 201 });
  } catch (err) {
    console.error('POST show error:', err);
    return NextResponse.json({ error: 'Failed to create show' }, { status: 500 });
  }
};