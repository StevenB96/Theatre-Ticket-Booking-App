// app/admin/performances/[id]/edit/EditPerformanceForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Performance, TheatreHasShowOption } from '@/types/performance';
import {
  formatDateToDDMMYYYY,
  parseDDMMYYYYToISO
} from '@/library/functions'
import { updatePerformanceByIdAction } from '../actions';

interface EditPerformanceFormProps {
  performance: Performance;
  theatreHasShowOptions: TheatreHasShowOption[];
}

export default function EditPerformanceForm({
  performance,
  theatreHasShowOptions
}: EditPerformanceFormProps) {
  const router = useRouter();

  const [theatreHasShowId, setTheatreHasShowId] = useState<string>(
    performance.theatre_has_show_id.toString()
  );

  const dateObj = new Date(performance.start_time); // e.g. "2025-06-05T19:00:00"

  const [startDate, setStartDate] = React.useState<string>(
    !isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 10) : ''
  );

  const [hoursMinutes, setHoursMinutes] = React.useState<string>(
    !isNaN(dateObj.getTime()) ? dateObj.toTimeString().slice(0, 5) : ''
  );

  const [typeValue, setTypeValue] = useState<string>(
    performance.type.toString()
  );
  const [statusValue, setStatusValue] = useState<string>(
    performance.status.toString()
  );

  return (
    <form action={updatePerformanceByIdAction}>
      <input
        type="hidden"
        name="id"
        value={performance.id}
      />

      <div>
        <label>
          Show:
          <select
            name="theatre_has_show_id"
            id="theatre_has_show_id"
            required
            value={theatreHasShowId}
            onChange={(e) => setTheatreHasShowId(e.target.value)}
          >
            {theatreHasShowOptions.map(option => (
              <option
                key={option.id}
                value={option.id}
              >
                {option.show_name} - {option.theatre_name}
              </option>
            ))}
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={hoursMinutes}
            onChange={(e) => setHoursMinutes(e.target.value)}
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
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
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
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/performances')}>
          Cancel
        </button>
      </div>
    </form>
  );
}

