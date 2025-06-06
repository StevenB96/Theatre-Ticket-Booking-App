// app/admin/performances/create/CreatePerformanceForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePerformanceForm() {
  const [theatreHasShowId, setTheatreHasShowId] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [typeValue, setTypeValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      theatre_has_show_id: Number(theatreHasShowId),
      start_time: startTime,
      type: Number(typeValue),
      status: Number(statusValue),
    };

    try {
      const res = await fetch('/api/performances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/performances');
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || res.statusText));
      }
    } catch (error) {
      alert('Unexpected error: ' + (error as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Theatre Has Show ID:
          <input
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
            type="number"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
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
