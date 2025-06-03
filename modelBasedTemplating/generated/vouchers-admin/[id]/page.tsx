// app/admin/vouchers/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getVoucherById } from '@/library/db/voucher';

interface EditVoucherPageProps {
  params: { id: string };
}

const EditVoucherForm = dynamic(() => import('./EditVoucherForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditVoucherPage({
  params,
}: EditVoucherPageProps): Promise<ReactNode> {
  const voucherId = Number(params.id);
  const voucher = await getVoucherById(voucherId);

  if (!voucher) {
    return (
      <div>
        <h1>Voucher not found</h1>
        <p>No voucher exists with ID #{voucherId}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Voucher #{voucher.id}</h1>
      <EditVoucherForm voucher={voucher} />
    </div>
  );
};