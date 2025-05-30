'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditShowForm({ show }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */
  const [title, setTitle] = useState(show.title || '');
  const [startRun, setStartRun] = useState(show.start_run || '');
  const [endRun, setEndRun] = useState(show.end_run || '');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title,
      start_run: startRun,
      end_run: endRun,
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
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Start of Run:
          <input
            type="date"
            value={startRun}
            onChange={(e) => setStartRun(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End of Run:
          <input
            type="date"
            value={endRun}
            onChange={(e) => setEndRun(e.target.value)}
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