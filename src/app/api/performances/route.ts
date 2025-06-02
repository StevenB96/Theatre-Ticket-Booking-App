import { NextResponse } from 'next/server';
import {
  getAllPerformances,
  createPerformance,
} from '@/library/db/performance';

// GET /api/performances
export async function GET() {
  try {
    const performances = await getAllPerformances();
    return NextResponse.json(performances);
  } catch (err) {
    console.error('GET performances error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch performances' },
      { status: 500 }
    );
  }
}

// POST /api/performances
export async function POST(req: Request) {
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

    const newPerformance = await createPerformance({
      theatre_has_show_id,
      start_time,
      type,
      status,
    });

    return NextResponse.json(newPerformance, { status: 201 });
  } catch (err) {
    console.error('POST performance error:', err);
    return NextResponse.json(
      { error: 'Failed to create performance' },
      { status: 500 }
    );
  };
}
