'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateShowForm() {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */
  const [title, setTitle] = useState('');
  const [startRun, setStartRun] = useState('');
  const [endRun, setEndRun] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/shows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        start_run: startRun,
        end_run: endRun,
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
          Create
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};