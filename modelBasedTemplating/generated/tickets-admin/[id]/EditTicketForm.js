'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTicketForm({ ticket }) {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */
 
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    /* TEMPLATE COMMENT:
      Add relevant state attributes.
      E.g. const payload = { username, email };
    */

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