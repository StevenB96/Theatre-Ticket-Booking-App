// app/admin/seats/[id]/edit/EditSeatForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Seat, UpdateSeatInput } from '@/types/seat';

interface EditSeatFormProps {
  seat: Seat;
}

export default function EditSeatForm({
  seat,
}: EditSeatFormProps) {
  const [theatreIdValue, setTheatreIdValue] = useState<string>(seat.theatre_id.toString());
  const [codeValue, setCodeValue] = useState<string>(seat.code);
  const [zoneValue, setZoneValue] = useState<string>(seat.zone);
  const [statusValue, setStatusValue] = useState<string>(seat.status.toString());

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: UpdateSeatInput = {
      id: seat.id,
      theatre_id: Number(theatreIdValue),
      code: codeValue,
      zone: zoneValue,
      status: Number(statusValue),
    };

    const res = await fetch('/api/seats/' + seat.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/seats');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Theatre ID:
          <input
            type="number"
            value={theatreIdValue}
            onChange={(e) => setTheatreIdValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Code:
          <input
            type="text"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Zone:
          <input
            type="text"
            value={zoneValue}
            onChange={(e) => setZoneValue(e.target.value)}
            required
          />
        </label>
      </div>

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

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
