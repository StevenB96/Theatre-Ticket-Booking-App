// app/admin/seats/create/CreateSeatForm.tsx
'use client';

import React, { useState } from 'react';
import { createSeatAction } from '../actions';

export default function CreateSeatForm() {
  const [theatreIdValue, setTheatreIdValue] = useState<string>('');
  const [codeValue, setCodeValue] = useState<string>('');
  const [zoneValue, setZoneValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  return (
    <form action={createSeatAction}>
      <div>
        <label>
          Theatre ID:
          <input
            id="theatreId"
            name="theatreId"
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
        <button type="submit">Create</button>
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};