// app/admin/performances/create/CreatePerformanceForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { createPerformanceAction } from '../actions';

export default function CreatePerformanceForm() {
  const router = useRouter();

  return (
    <form action={createPerformanceAction}>
      <div>
        <label>
          Theatre Has Show ID:
          <input
            id="theatre_has_show_id"
            name="theatre_has_show_id"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Start Time:
          <input
            id="start_time"
            name="start_time"
            type="time"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Type:
          <input
            id="type"
            name="type"
            type="number"
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
