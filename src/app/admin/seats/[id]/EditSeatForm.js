'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditSeatForm({ seat }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const [theatre_id, setTheatreId] = useState(seat.theatre_id);
  const [code, setCode] = useState(seat.code);
  const [zone, setZone] = useState(seat.zone);
  const [status, setStatus] = useState(seat.status);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    /* TEMPLATE COMMENT:
      Add relevant state attributes.
      E.g. const payload = { username, email };
    */

    const payload = {
      theatre_id,
      code,
      zone,
      status
    };

    const res = await fetch('/api/seats/' + seat.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
            Seatname:
            <input
              type="text"
              value={username}
              onChange={(e) => setSeatname(e.target.value)}
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
          Save
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};