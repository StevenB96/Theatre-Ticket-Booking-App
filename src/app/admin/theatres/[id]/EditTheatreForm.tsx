// app/admin/theatres/[id]/edit/EditTheatreForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Theatre, UpdateTheatreInput } from '@/types/theatre';

interface EditTheatreFormProps {
  theatre: Theatre;
}

export default function EditTheatreForm({
  theatre,
}: EditTheatreFormProps) {
  const [nameValue, setNameValue] = useState<string>(
    theatre.name.toString()
  );
  const [addressValue, setAddressValue] = useState<string>(
    theatre.address.toString()
  );
  const [statusValue, setStatusValue] = useState<string>(
    theatre.status.toString()
  );

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: UpdateTheatreInput = {
      id: theatre.id,
      name: nameValue,
      address: addressValue,
      status: Number(statusValue),
    };

    const res = await fetch('/api/theatres/' + theatre.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/theatres');
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
