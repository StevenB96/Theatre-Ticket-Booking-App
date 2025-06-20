// app/admin/performances/[id]/edit/EditPerformanceForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Performance } from '@/types/performance';
import { updatePerformanceByIdAction } from '../actions';

interface EditPerformanceFormProps {
  performance: Performance;
}

export default function EditPerformanceForm({ performance }: EditPerformanceFormProps) {
  const router = useRouter();

  const [theatreHasShowId, setTheatreHasShowId] = useState<string>(
    performance.theatre_has_show_id.toString()
  );
  const [startTime, setStartTime] = useState<string>(
    performance.start_time
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
          Theatre Has Show ID:
          <input
            id="theatre_has_show_id"
            name="theatre_has_show_id"
            type="number"
            value={theatreHasShowId}
            onChange={(e) => setTheatreHasShowId(e.target.value)}
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
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
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
        <button type="button" onClick={() => router.push('/admin/performances')}>
          Cancel
        </button>
      </div>
    </form>
  );
}

