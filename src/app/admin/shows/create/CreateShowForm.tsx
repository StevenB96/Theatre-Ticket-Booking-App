// app/admin/shows/create/CreateShowForm.tsx
'use client';

import React from 'react';
import { createShowAction } from '../actions';

export default function CreateShowForm() {
  return (
    <form action={createShowAction}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <input
          id="status"
          name="status"
          type="number"
        />
      </div>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
