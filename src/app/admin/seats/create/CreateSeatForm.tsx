// app/admin/seats/create/CreateSeatForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSeatForm() {
  const [theatreIdValue, setTheatreIdValue] = useState<string>('');
  const [codeValue, setCodeValue] = useState<string>('');
  const [zoneValue, setZoneValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      theatre_id: theatreIdValue,
      code: codeValue,
      zone: zoneValue,
      status: statusValue,
    };

    try {
      const res = await fetch('/api/seats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/seats');
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
          Theatre ID:
          <input
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