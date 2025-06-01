'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditShowForm({ show }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */
  const [name, setName] = useState(show.name || '');
  const [status, setStatus] = useState(show.status || 1);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      status
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
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TEMPLATE COMMENT:
        Add relevant inputs. E.g.    
        <div>
          <label>
            Showname:
            <input
              type="text"
              value={username}
              onChange={(e) => setShowname(e.target.value)}
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
          Save
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};