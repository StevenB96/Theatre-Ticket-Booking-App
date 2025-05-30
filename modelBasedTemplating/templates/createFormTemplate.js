// templates/createFormTemplate.js
const createFormTemplate = `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Create<%= Name %>Form() {
  /* TEMPLATE COMMENT:
    Add relevant state attributes.
    E.g. const [username, setUsername] = useState('');
  */

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/<%= pluralName %>', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        /* TEMPLATE COMMENT:
          Add relevant state attributes.
          E.g. { name, email, password }
        */
      ),
    });

    if (res.ok) {
      router.push('/admin/<%= pluralName %>');
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
        <button type="submit">
          Create
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};`;

module.exports = createFormTemplate;
