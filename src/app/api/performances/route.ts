import { NextResponse } from 'next/server';
import {
  getAllPerformances,
  createPerformance,
} from '@/library/db/performance';
import {
  Performance,
  CreatePerformanceInput,
} from '@/types/performance';

// GET /api/performances
export async function GET() {
  try {
    const performances: Performance[] = await getAllPerformances();
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
    const body: CreatePerformanceInput = await req.json();

    const newPerformance: Performance = await createPerformance(body);

    return NextResponse.json(newPerformance, { status: 201 });
  } catch (err) {
    console.error('POST performance error:', err);
    return NextResponse.json(
      { error: 'Failed to create performance' },
      { status: 500 }
    );
  };
}
