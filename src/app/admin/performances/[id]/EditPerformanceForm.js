'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPerformanceForm({ performance }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const [theatre_has_show_id, setTheatreHasShowId] = useState(performance.theatre_has_show_id);
  const [start_time, setStartTime] = useState(performance.status);
  const [type, setType] = useState(performance.type);
  const [status, setStatus] = useState(performance.status);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    /* TEMPLATE COMMENT:
      Add relevant state attributes.
      E.g. const payload = { username, email };
    */

    const payload = {
      theatre_has_show_id,
      start_time,
      type,
      status,
    };

    const res = await fetch('/api/performances/' + user.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/performances');
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
            Performancename:
            <input
              type="text"
              value={username}
              onChange={(e) => setPerformancename(e.target.value)}
              required
            />
          </label>
        </div>
      */}

      <div>
        <label>
          Theatre Has Show ID:
          <input
            type="number"
            value={theatre_has_show_id}
            onChange={(e) => setTheatreHasShowId(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Start Time:
          <input
            type="time"
            value={start_time}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Type:
          <input
            type="number"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          Save
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};