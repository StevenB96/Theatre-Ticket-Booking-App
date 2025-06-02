'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTicketForm() {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const [user_id, setUserId] = useState('');
  const [seat_id, setSeatId] = useState('');
  const [performance_id, setPerformanceId] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* TEMPLATE COMMENT:
          Add relevant state attributes.
          E.g. { name, email, password }
        */
        user_id,
        seat_id,
        performance_id,
        price,
        status,
      }),
    });

    if (res.ok) {
      router.push('/admin/tickets');
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
          User ID:
          <input
            type="number"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Seat ID:
          <input
            type="number"
            value={seat_id}
            onChange={(e) => setSeatId(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Performance ID:
          <input
            type="number"
            value={performance_id}
            onChange={(e) => setPerformanceId(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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