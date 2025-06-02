import { NextResponse } from 'next/server';
import {
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} from '@/library/db/performance';

// GET /api/performances/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const performanceId = Number(params.id);
    const performance = await getPerformanceById(performanceId);

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

// PUT /api/performances/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
      theatre_has_show_id,
      start_time,
      type,
      status,
    }: {
      theatre_has_show_id: number;
      start_time: string;
      type: number;
      status: number;
    } = await req.json();

    const performanceId = Number(params.id);
    const updated = await updatePerformance(performanceId, {
      theatre_has_show_id,
      start_time,
      type,
      status,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT performance error:', err);
    return NextResponse.json(
      { error: 'Failed to update performance' },
      { status: 500 }
    );
  }
}

// DELETE /api/performances/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const performanceId = Number(params.id);
    await deletePerformance(performanceId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE performance error:', err);
    return NextResponse.json(
      { error: 'Failed to delete performance' },
      { status: 500 }
    );
  }
}
