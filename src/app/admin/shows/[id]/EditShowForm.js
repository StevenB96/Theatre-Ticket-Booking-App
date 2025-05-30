'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditShowForm({ user }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { username, email };
    if (password) payload.password = password;

    const res = await fetch('/api/shows/' + user.id, {
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