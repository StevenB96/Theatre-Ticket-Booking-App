// app/admin/shows/[id]/edit/EditShowForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Show, UpdateShowInput } from '@/types/show';

interface EditShowFormProps {
  show: Show;
}

export default function EditShowForm({
  show,
}: EditShowFormProps) {
  const [nameValue, setNameValue] = useState<string>(show.name.toString());
  const [statusValue, setStatusValue] = useState<string>(show.status.toString());

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: UpdateShowInput = {
      id: show.id,
      name: nameValue,
      status: Number(statusValue),
    };

    const res = await fetch('/api/shows/' + show.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/shows');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
