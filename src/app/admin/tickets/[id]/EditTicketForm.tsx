// app/admin/tickets/[id]/edit/EditTicketForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';
import { updateTicketByIdAction } from '../actions';

interface EditTicketFormProps {
  ticket: Ticket;
}

export default function EditTicketForm({ ticket }: EditTicketFormProps) {
  const router = useRouter();

  const [userIdValue, setUserIdValue] = useState<string>(ticket.user_id.toString(),
  );
  const [seatIdValue, setSeatIdValue] = useState<string>(ticket.seat_id.toString());
  const [performanceIdValue, setPerformanceIdValue] = useState<string>(ticket.performance_id.toString());
  const [priceValue, setPriceValue] = useState<string>(ticket.price.toString());
  const [statusValue, setStatusValue] = useState<string>(ticket.status.toString());

  return (
    <form action={updateTicketByIdAction}>
      <input type="hidden" name="id" value={ticket.id} />

      <div>
        <label>
          User ID:
          <input
            id="user_id"
            name="user_id"
            type="number"
            value={userIdValue}
            onChange={(e) => setUserIdValue(e.target.value)}
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
            value={seatIdValue}
            onChange={(e) => setSeatIdValue(e.target.value)}
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
            value={performanceIdValue}
            onChange={(e) => setPerformanceIdValue(e.target.value)}
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
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
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
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/tickets')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
