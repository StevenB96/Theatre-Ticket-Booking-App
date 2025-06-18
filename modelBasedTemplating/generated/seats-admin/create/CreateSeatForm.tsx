// app/admin/seats/create/CreateSeatForm.tsx
'use client';

import React, { useState } from 'react';
import { createSeatAction } from '../actions';

export default function CreateSeatForm() {
  /* TEMPLATE COMMENT:
    Add useState hooks for each editable field, initialized from seat.
    e.g.
    const [status, setStatus] = useState(String(seat.status));
  */

  return (
    <form action={createSeatAction}>
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
        <button type="submit">Create</button>
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
