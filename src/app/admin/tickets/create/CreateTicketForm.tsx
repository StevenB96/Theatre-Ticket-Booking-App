// app/admin/tickets/create/CreateTicketForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'
import type { Seat } from '@/types/seat';
import type { PerformanceWithRelations } from '@/types/performance';
import type { User } from '@/types/user';
import { createTicketAction } from '../actions';

interface CreateTicketFormProps {
  users: User[];
  seats: Seat[];
  performances: PerformanceWithRelations[];
}

export default function CreateTicketForm({
  users,
  seats,
  performances,
}: CreateTicketFormProps) {
  const router = useRouter();

  return (
    <form action={createTicketAction}>
      <div>
        <label>
          User:
          <select
            name="user_id"
            id="user_id"
            required
          >
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.username}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Seat:
          <select
            name="seat_id"
            id="seat_id"
            required
          >
            {seats.map(seat => (
              <option
                key={seat.id}
                value={seat.id}
              >
                {seat.code}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Performance:
          <select
            name="performance_id"
            id="performance_id"
            required
          >
            {performances.map(performance => (
              <option
                key={performance.id}
                value={performance.id}
              >
                {performance.show?.name} - {performance.theatre?.name}
              </option>
            ))}
          </select>
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
          <select
            name="status"
            id="status"
            required
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
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
