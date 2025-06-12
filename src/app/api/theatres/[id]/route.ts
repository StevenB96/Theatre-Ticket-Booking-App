// app/api/theatres/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getTheatreById,
  updateTheatreById,
  deleteTheatreById,
} from '@/library/db/theatre';
import {
  Theatre,
  UpdateTheatreInput
} from '@/types/theatre';

// GET /api/theatres/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const theatreIdFromUrl = parseInt(id, 10);
    const theatre = await getTheatreById(theatreIdFromUrl);

    if (!theatre) {
      return NextResponse.json(
        { error: 'Theatre not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(theatre);
  } catch (err) {
    console.error('GET theatre error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch theatre' },
      { status: 500 }
    );
  }
}

// PUT /api/theatres/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdateTheatreInput = await req.json();
    const { id } = await context.params;
    const theatreIdFromUrl = parseInt(id, 10);

    if (body.id !== theatreIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Theatre = await updateTheatreById(theatreIdFromUrl, body);

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT theatre error:', err);
    return NextResponse.json(
      { error: 'Failed to update theatre' },
      { status: 500 }
    );
  }
}

// DELETE /api/theatres/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const theatreIdFromUrl = parseInt(id, 10);
    await deleteTheatreById(theatreIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE theatre error:', err);

    return NextResponse.json(
      { error: 'Failed to delete theatre' },
      { status: 500 }
    );
  }
};