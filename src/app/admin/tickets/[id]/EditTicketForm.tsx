// app/admin/tickets/[id]/edit/EditTicketForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Ticket, UpdateTicketInput } from '@/types/ticket';

interface EditTicketFormProps {
  ticket: Ticket;
}

export default function EditTicketForm({
  ticket,
}: EditTicketFormProps) {
  const [userIdValue, setUserIdValue] = useState<string>(ticket.user_id.toString(),
  );
  const [seatIdValue, setSeatIdValue] = useState<string>(ticket.seat_id.toString());
  const [performanceIdValue, setPerformanceIdValue] = useState<string>(ticket.performance_id.toString());
  const [priceValue, setPriceValue] = useState<string>(ticket.price.toString());
  const [statusValue, setStatusValue] = useState<string>(ticket.status.toString());

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      id: ticket.id,
      user_id: Number(userIdValue),
      seat_id: Number(seatIdValue),
      performance_id: Number(performanceIdValue),
      price: Number(priceValue),
      status: Number(statusValue),
    };

    const res = await fetch('/api/tickets/' + ticket.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/tickets');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          User ID:
          <input
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
            type="number"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
