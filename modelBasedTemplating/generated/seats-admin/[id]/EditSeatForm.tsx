// app/admin/seats/[id]/edit/EditSeatForm.tsx
'use client';

import React, { useState } from 'react';
import type { Seat } from '@/types/seat';
import { updateSeatByIdAction } from '../actions';

interface EditSeatFormProps {
  seat: Seat;
}

export default function EditSeatForm({ seat }: EditSeatFormProps) {
  /* TEMPLATE COMMENT:
    Add useState hooks for each editable field, initialized from seat.
    e.g.
    const [status, setStatus] = useState(String(seat.status));
  */

  return (
    <form action={updateSeatByIdAction}>
      <input type="hidden" name="id" value={seat.id} />

      {/* TEMPLATE COMMENT:
        Add form fields. Use htmlFor, name/id matching fields, and hook up state/useState.
        e.g.
        <div>
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            name="status"
            type="number"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      */}

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
