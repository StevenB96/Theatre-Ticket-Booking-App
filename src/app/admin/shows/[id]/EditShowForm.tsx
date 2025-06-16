// app/admin/shows/[id]/edit/EditShowForm.tsx
'use client';

import React, { useState } from 'react';
import type { Show } from '@/types/show';
import { updateShowByIdAction } from '../actions';

interface EditShowFormProps {
  show: Show;
}

export default function EditShowForm({ show }: EditShowFormProps) {
  const [name, setName] = useState(show.name);
  const [status, setStatus] = useState(String(show.status));

  return (
    <form action={updateShowByIdAction}>
      <input type="hidden" name="id" value={show.id} />

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

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

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}