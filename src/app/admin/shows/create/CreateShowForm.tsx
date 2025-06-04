// app/admin/shows/create/CreateShowForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateShowForm() {
  const [nameValue, setNameValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      name: nameValue,
      status: Number(statusValue),
    };

    try {
      const res = await fetch('/api/shows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/shows');
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
          Name:
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
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