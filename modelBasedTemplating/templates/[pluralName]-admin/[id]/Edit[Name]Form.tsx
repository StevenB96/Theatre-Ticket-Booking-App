// templates/editFormTemplate.js
const editFormTemplate = `// app/admin/<%= pluralName %>/[id]/edit/Edit<%= Name %>Form.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { <%= Name %> } from '@/types/<%= name %>';
import { update<%= Name %>ByIdAction } from '../actions';

interface Edit<%= Name %>FormProps {
  <%= name %>: <%= Name %>;
}

export default function Edit<%= Name %>Form({ <%= name %> }: Edit<%= Name %>FormProps) {
  const router = useRouter();

  /* TEMPLATE COMMENT:
    Add useState hooks for each editable field, initialized from <%= name %>.
    e.g.
    const [status, setStatus] = useState(String(<%= name %>.status));
  */

  return (
    <form action={update<%= Name %>ByIdAction}>
      <input type="hidden" name="id" value={<%= name %>.id} />

      {/* TEMPLATE COMMENT:
        Add form fields. Use htmlFor, name/id matching fields, and hook up state/useState.
        e.g.
        <div>
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            name="status"
            type="number"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      */}

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/<%= pluralName %>')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
`;

module.exports = editFormTemplate;