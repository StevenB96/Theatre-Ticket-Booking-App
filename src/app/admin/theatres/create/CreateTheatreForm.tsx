// app/admin/theatres/create/CreateTheatreForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { createTheatreAction } from '../actions';

export default function CreateTheatreForm() {
  const router = useRouter();

  return (
    <form action={createTheatreAction}>
      <div>
        <label>
          Name:
          <input
            id="name"
            name="name"
            type="text"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Address:
          <textarea
            id="address"
            name="address"
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
