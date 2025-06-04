// app/admin/theatres/create/CreateTheatreForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTheatreForm() {
  const [nameValue, setNameValue] = useState<string>('');
  const [addressValue, setAddressValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      name: nameValue,
      address: addressValue,
      status: Number(statusValue),
    };

    try {
      const res = await fetch('/api/theatres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/theatres');
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
          Address:
          <textarea
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
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
        <button type="submit">
          Create
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};