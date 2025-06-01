import { NextResponse } from 'next/server';
import {
  getShowById,
  updateShow,
  deleteShow
} from '@/lib/db/show';

export async function GET(_, { params }) {
  try {
    const { id: showId } = await params;
    const show = await getShowById(Number(showId));
    if (!show) {
      return NextResponse.json({ error: 'Show not found' }, { status: 404 });
    }
    return NextResponse.json(show);
  } catch (err) {
    console.error('GET show error:', err);
    return NextResponse.json({ error: 'Failed to fetch show' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
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

    const { id: showId } = await params;
    const updated = await updateShow(Number(showId), {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      name,
      status,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT show error:', err);

    return NextResponse.json({ error: 'Failed to update show' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: showId } = await params;
    await deleteShow(Number(showId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE show error:', err);
    return NextResponse.json({ error: 'Failed to delete show' }, { status: 500 });
  }
};