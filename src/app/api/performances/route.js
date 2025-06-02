import { NextResponse } from 'next/server';
import {
  getAllPerformances,
  createPerformance
} from '@/library/db/performance';

export async function GET() {
  try {
    const performances = await getAllPerformances();
    return NextResponse.json(performances);
  } catch (err) {
    console.error('GET performances error:', err);
    return NextResponse.json({ error: 'Failed to fetch performances' }, { status: 500 });
  }
};

export async function POST(req) {
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

    const newPerformance = await createPerformance({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
      theatre_has_show_id,
      start_time,
      type,
      status,
    });

    return NextResponse.json(newPerformance, { status: 201 });
  } catch (err) {
    console.error('POST performance error:', err);
    return NextResponse.json({ error: 'Failed to create performance' }, { status: 500 });
  }
};