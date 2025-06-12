// app/api/shows/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getShowById,
  updateShowById,
  deleteShowById,
} from '@/library/db/show';
import {
  Show,
  UpdateShowInput
} from '@/types/show';

// GET /api/shows/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const showIdFromUrl = parseInt(id, 10);
    const show = await getShowById(showIdFromUrl);

    if (!show) {
      return NextResponse.json(
        { error: 'Show not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(show);
  } catch (err) {
    console.error('GET show error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch show' },
      { status: 500 }
    );
  }
}

// PUT /api/shows/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdateShowInput = await req.json();
    const { id } = await context.params;
    const showIdFromUrl = parseInt(id, 10);

    if (body.id !== showIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Show = await updateShowById(showIdFromUrl, body);

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT show error:', err);
    return NextResponse.json(
      { error: 'Failed to update show' },
      { status: 500 }
    );
  }
}

// DELETE /api/shows/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const showIdFromUrl = parseInt(id, 10);
    await deleteShowById(showIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE show error:', err);

    return NextResponse.json(
      { error: 'Failed to delete show' },
      { status: 500 }
    );
  }
};