import { NextResponse } from 'next/server';
import {
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} from '@/library/db/performance';
import {
  Performance,
  UpdatePerformanceInput
} from '@/types/performance';

// GET /api/<%= pluralName %>/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const performanceIdFromUrl = parseInt(id, 10);
    const performance = await getPerformanceById(performanceIdFromUrl);

    if (!performance) {
      return NextResponse.json(
        { error: 'Performance not found' },
        { status: 404 }
      );
    }

    if (!performance) {
      return NextResponse.json(
        { error: 'Performance not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(performance);
  } catch (err) {
    console.error('GET performance error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch performance' },
      { status: 500 }
    );
  }
}

// PUT /api/<%= pluralName %>/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdatePerformanceInput = await req.json();
    const { id } = await context.params;
    const performanceIdFromUrl = parseInt(id, 10);

    if (body.id !== performanceIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Performance = await updatePerformance(performanceIdFromUrl, body);

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT performance error:', err);
    return NextResponse.json(
      { error: 'Failed to update performance' },
      { status: 500 }
    );
  }
}

// DELETE /api/<%= pluralName %>/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const performanceIdFromUrl = parseInt(id, 10);
    await deletePerformance(performanceIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE performance error:', err);
    return NextResponse.json(
      { error: 'Failed to delete performance' },
      { status: 500 }
    );
  }
}
