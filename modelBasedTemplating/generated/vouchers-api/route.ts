import { NextResponse } from 'next/server';
import {
  getAllVouchers,
  createVoucher,
} from '@/library/db/voucher';
import {
  Voucher,
  CreateVoucherInput,
} from '@/types/voucher';

// GET /api/vouchers
export async function GET() {
  try {
    const vouchers: Voucher[] = await getAllVouchers();
    return NextResponse.json(vouchers);
  } catch (err) {
    console.error('GET vouchers error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch vouchers' },
      { status: 500 }
    );
  }
}

// POST /api/vouchers
export async function POST(req: Request) {
  try {
    const body: CreateVoucherInput = await req.json();

    const newVoucher: Voucher = await createVoucher(body);

    return NextResponse.json(newVoucher, { status: 201 });
  } catch (err) {
    console.error('POST voucher error:', err);
    return NextResponse.json(
      { error: 'Failed to create voucher' },
      { status: 500 }
    );
  };
};