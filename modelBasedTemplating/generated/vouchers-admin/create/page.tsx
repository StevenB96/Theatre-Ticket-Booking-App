// app/admin/vouchers/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateVoucherForm = dynamic(
  () => import('./CreateVoucherForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateVoucherPage(): ReactNode {
  return (
    <div>
      <h1>Create Voucher</h1>
      <CreateVoucherForm />
    </div>
  );
};