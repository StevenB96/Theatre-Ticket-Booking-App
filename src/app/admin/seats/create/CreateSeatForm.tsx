// app/admin/seats/create/CreateSeatForm.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { createSeatAction } from '../actions';

export default function CreateSeatForm() {
  const router = useRouter();

  return (
    <form action={createSeatAction}>
      <div>
        <label>
          Theatre ID:
          <input
            id="theatre_id"
            name="theatre_id"
            type="number"
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
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};