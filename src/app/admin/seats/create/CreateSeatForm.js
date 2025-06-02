'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSeatForm() {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const [theatre_id, setTheatreId] = useState('');
  const [code, setCode] = useState('');
  const [zone, setZone] = useState('');
  const [status, setStatus] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/seats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        theatre_id,
        code,
        zone,
        status
      ),
    });

    if (res.ok) {
      router.push('/admin/seats');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* TEMPLATE COMMENT:
        Add relevant inputs. E.g.
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
      */}

      <div>
        <label>
          Theatre ID:
          <input
            type="number"
            value={theatre_id}
            onChange={(e) => setTheatreId(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Code:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Zone:
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <input
            type="number"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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