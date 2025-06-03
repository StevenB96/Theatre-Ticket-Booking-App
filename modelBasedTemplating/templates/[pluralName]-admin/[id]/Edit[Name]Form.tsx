// templates/editFormTemplate.js
const editFormTemplate = `// app/admin/<%= pluralName %>/[id]/edit/Edit<%= Name %>Form.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { <%= Name %>, Update<%= Name %>Input } from '@/types/<%= name %>';

interface Edit<%= Name %>FormProps {
  <%= name %>: <%= Name %>;
}

export default function Edit<%= Name %>Form({
  <%= name %>,
}: Edit<%= Name %>FormProps) {
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

    const payload: Update<%= Name %>Input = {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. id: <%= name %>.id,
      */
    };

    const res = await fetch('/api/<%= pluralName %>/' + <%= name %>.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/<%= pluralName %>');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
`;

module.exports = editFormTemplate;
