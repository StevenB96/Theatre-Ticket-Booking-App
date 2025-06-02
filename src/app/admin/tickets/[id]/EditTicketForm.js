'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTicketForm({ ticket }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const [user_id, setUserId] = useState(ticket.user_id);
  const [seat_id, setSeatId] = useState(ticket.seat_id);
  const [performance_id, setPerformanceId] = useState(ticket.performance_id);
  const [price, setPrice] = useState(ticket.price);
  const [status, setStatus] = useState(ticket.status);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    /* TEMPLATE COMMENT:
      Add relevant state attributes.
      E.g. const payload = { username, email };
    */

    const payload = {
      user_id,
      seat_id,
      performance_id,
      price,
      status,
    };

    const res = await fetch('/api/tickets/' + user.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
            Ticketname:
            <input
              type="text"
              value={username}
              onChange={(e) => setTicketname(e.target.value)}
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
          Save
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};