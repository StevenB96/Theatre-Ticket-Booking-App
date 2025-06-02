import { NextResponse } from 'next/server';
import {
  getPerformanceById,
  updatePerformance,
  deletePerformance
} from '@/library/db/performance';

export async function GET(_, { params }) {
  try {
    const { id: performanceId } = await params;
    const performance = await getPerformanceById(Number(performanceId));
    if (!performance) {
      return NextResponse.json({ error: 'Performance not found' }, { status: 404 });
    }
    return NextResponse.json(performance);
  } catch (err) {
    console.error('GET performance error:', err);
    return NextResponse.json({ error: 'Failed to fetch performance' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
  try {
    const {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_has_show_id,
      start_time,
      type,
      status,
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */

    const { id: performanceId } = await params;
    const updated = await updatePerformance(Number(performanceId), {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_has_show_id,
      start_time,
      type,
      status,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT performance error:', err);

    return NextResponse.json({ error: 'Failed to update performance' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: performanceId } = await params;
    await deletePerformance(Number(performanceId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE performance error:', err);
    return NextResponse.json({ error: 'Failed to delete performance' }, { status: 500 });
  }
};