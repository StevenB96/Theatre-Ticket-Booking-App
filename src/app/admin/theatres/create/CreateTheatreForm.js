'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTheatreForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/theatres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address }),
    });

    if (res.ok) {
      router.push('/admin/theatres');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div className="space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
