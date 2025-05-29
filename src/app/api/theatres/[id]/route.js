import { NextResponse } from 'next/server';
import {
  getTheatreById,
  updateTheatre,
  deleteTheatre
} from '@/lib/db/theatre';

export async function GET(_, { params }) {
  try {
    const theatre = await getTheatreById(params.id);
    if (!theatre) {
      return NextResponse.json({ error: 'Theatre not found' }, { status: 404 });
    }
    return NextResponse.json(theatre);
  } catch (err) {
    console.error('GET theatre error:', err);
    return NextResponse.json({ error: 'Failed to fetch theatre' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { name, address } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const updated = await updateTheatre(params.id, { name, address });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT theatre error:', err);
    return NextResponse.json({ error: 'Failed to update theatre' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await deleteTheatre(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE theatre error:', err);
    return NextResponse.json({ error: 'Failed to delete theatre' }, { status: 500 });
  }
}
