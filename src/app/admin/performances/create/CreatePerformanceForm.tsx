// app/admin/performances/create/CreatePerformanceForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import type { TheatreHasShowOption } from '@/types/performance';
import { createPerformanceAction } from '../actions';

interface CreatePerformanceFormProps {
  theatreHasShowOptions: TheatreHasShowOption[];
}

export default function CreatePerformanceForm({
  theatreHasShowOptions
}: CreatePerformanceFormProps) {
  const router = useRouter();

  return (
    <form action={createPerformanceAction}>
      <div>
        <label>
          Show:
          <select
            name="theatre_has_show_id"
            id="theatre_has_show_id"
            required
          >
            {theatreHasShowOptions.map(
              option =>
                <option
                  value={option.id}>
                  {option.show_name} - {option.theatre_name}
                </option>
            )}
          </select>
        </label>
      </div>

      <div>
        <label>
          Date:
          <input
            id="date"
            name="date"
            type="date"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Time:
          <input
            id="time"
            name="time"
            type="time"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Type:
          <select
            name="type"
            id="type"
            required
          >
            <option value={1}>Evening</option>
            <option value={0}>Matinee</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Status:
          <select
            name="status"
            id="status"
            required
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
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
