// app/admin/vouchers/[id]/edit/EditVoucherForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Voucher, UpdateVoucherInput } from '@/types/voucher';

interface EditVoucherFormProps {
  voucher: Voucher;
}

export default function EditVoucherForm({
  voucher,
}: EditVoucherFormProps) {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g.
    const [status, setStatus] = useState<string>(
      voucher.status.toString()
    );
  */

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: UpdateVoucherInput = {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. id: voucher.id,
      */
    };

    const res = await fetch('/api/vouchers/' + voucher.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/vouchers');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TEMPLATE COMMENT:
        Add relevant inputs.
        E.g.
        <div>
          <label>
            Status:
            <input
              type="number"
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              required
            />
          </label>
        </div>
      */}

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
