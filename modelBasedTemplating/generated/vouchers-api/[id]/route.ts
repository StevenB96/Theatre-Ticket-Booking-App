import { NextResponse } from 'next/server';
import {
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} from '@/library/db/voucher';
import {
  Voucher,
  UpdateVoucherInput
} from '@/types/voucher';

// GET /api/vouchers/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const voucherId = Number(params.id);
    const voucher = await getVoucherById(voucherId);

    if (!voucher) {
      return NextResponse.json(
        { error: 'Voucher not found' },
        { status: 404 }
      );
    }

    if (!voucher) {
      return NextResponse.json(
        { error: 'Voucher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(voucher);
  } catch (err) {
    console.error('GET voucher error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch voucher' },
      { status: 500 }
    );
  }
}

// PUT /api/vouchers/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateVoucherInput = await req.json();

    const voucherIdFromUrl = Number(params.id);
    if (body.id !== voucherIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: Voucher = await updateVoucher(voucherIdFromUrl, {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. id: body.id,
      */
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT voucher error:', err);
    return NextResponse.json(
      { error: 'Failed to update voucher' },
      { status: 500 }
    );
  }
}

// DELETE /api/vouchers/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const voucherId = Number(params.id);
    await deleteVoucher(voucherId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE voucher error:', err);
    return NextResponse.json(
      { error: 'Failed to delete voucher' },
      { status: 500 }
    );
  }
};