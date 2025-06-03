// app/admin/vouchers/VoucherTable.server.tsx
import Link from 'next/link';
import type { Voucher } from '@/types/voucher';

interface VoucherTableServerProps {
  data: Voucher[];
  onDelete?: (id: number) => void;
};

export default function VoucherTableServer({
  data,
  onDelete,
}: VoucherTableServerProps) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes.
            E.g. <th>ID</th>
          */}
        </tr>
      </thead>
      <tbody>
        {data.map((voucher) => (
          <tr key={voucher.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes.
              E.g. <td>{voucher.id}</td>
            */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};