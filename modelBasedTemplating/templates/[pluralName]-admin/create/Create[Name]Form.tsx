// templates/createFormTemplate.js
const createFormTemplate = `// app/admin/<%= pluralName %>/create/Create<%= Name %>Form.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Create<%= Name %>Form() {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g.
    const [status, setStatus] = useState<string>(
      <%= name %>.status.toString()
    );
  */

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. status: Number(<%= name %>.status),
      */
    };

    try {
      const res = await fetch('/api/<%= pluralName %>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/<%= pluralName %>');
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || res.statusText));
      }
    } catch (error) {
      alert('Unexpected error: ' + (error as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TEMPLATE COMMENT:
        Add relevant inputs.
        E.g.
        <div>
          <label>
            Status:
            <input
              type="number"
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              required
            />
          </label>
        </div>
      */}

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};`;

module.exports = createFormTemplate;
