// templates/createFormTemplate.js
const createFormTemplate = `// app/admin/<%= pluralName %>/create/Create<%= Name %>Form.tsx

'use client';

import React from 'react';
import { create<%= Name %>Action } from '../actions';

export default function Create<%= Name %>Form() {
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
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
`;

module.exports = createFormTemplate;
