'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateShowForm() {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/shows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        status,
      }),
    });

    if (res.ok) {
      router.push('/admin/shows');
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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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