// app/admin/vouchers/page.tsx
// import Link from 'next/link';
import VoucherTable from './VoucherTable.client';
import { getAllVouchers } from '@/library/db/voucher';

export default async function VouchersPage() {
  const vouchers = await getAllVouchers();

  return (
    <div>
      <h1>Vouchers</h1>
      <p>
        <Link href="/admin/vouchers/create">+ New Voucher</Link>
      </p>
      <VoucherTable data={vouchers} />
    </div>
  );
};