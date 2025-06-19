// templates/createFormTemplate.js
const createFormTemplate = `// app/admin/<%= pluralName %>/create/Create<%= Name %>Form.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { create<%= Name %>Action } from '../actions';

export default function Create<%= Name %>Form() {
  const router = useRouter();

  return (
    <form action={create<%= Name %>Action}>
      {/* TEMPLATE COMMENT:
        Add relevant inputs here. Use htmlFor, name and id matching field names.
        e.g.
        <div>
          <label htmlFor="status">Status:</label>
          <input id="status" name="status" type="number" required />
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
};
`;

module.exports = createFormTemplate;
