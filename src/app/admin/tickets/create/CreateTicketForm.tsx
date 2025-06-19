// app/admin/tickets/create/CreateTicketForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import { createTicketAction } from '../actions';

export default function CreateTicketForm() {
  const router = useRouter();

  return (
    <form action={createTicketAction}>
      <div>
        <label>
          User ID:
          <input
            id="user_id"
            name="user_id"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Seat ID:
          <input
            id="seat_id"
            name="seat_id"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Performance ID:
          <input
            id="performance_id"
            name="performance_id"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Price:
          <input
            id="price"
            name="price"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <input
            id="status"
            name="status"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
