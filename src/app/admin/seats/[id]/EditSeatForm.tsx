// app/admin/seats/[id]/edit/EditSeatForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Seat } from '@/types/seat';
import { updateSeatByIdAction } from '../actions';

interface EditSeatFormProps {
  seat: Seat;
}

export default function EditSeatForm({ seat }: EditSeatFormProps) {
  const router = useRouter();

  const [theatreIdValue, setTheatreIdValue] = useState<string>(seat.theatre_id.toString());
  const [codeValue, setCodeValue] = useState<string>(seat.code.toString());
  const [zoneValue, setZoneValue] = useState<string>(seat.zone.toString());
  const [statusValue, setStatusValue] = useState<string>(seat.status.toString());

  return (
    <form action={updateSeatByIdAction}>
      <input type="hidden" name="id" value={seat.id} />

      <div>
        <label>
          Theatre ID:
          <input
            id="theatre_id"
            name="theatre_id"
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
            id="code"
            name="code"
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
            id="zone"
            name="zone"
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
            id="status"
            name="status"
            type="number"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/seats')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
