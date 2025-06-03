// app/admin/vouchers/VoucherTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Voucher } from '@/types/voucher';
import VoucherTableServer from './VoucherTable.server';

interface VoucherTableProps {
  data: Voucher[];
};

export default function VoucherTable({ data }: VoucherTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this voucher?')) return;
    await fetch('/api/vouchers/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <VoucherTableServer data={data} onDelete={handleDelete} />;
};