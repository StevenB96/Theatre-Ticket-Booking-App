// app/admin/tickets/create/CreateTicketForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTicketForm() {
  const [userIdValue, setUserIdValue] = useState<string>('');
  const [seatIdValue, setSeatIdValue] = useState<string>('');
  const [performanceIdValue, setPerformanceIdValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      user_id: Number(userIdValue),
      seat_id: Number(seatIdValue),
      performance_id: Number(performanceIdValue),
      price: Number(priceValue),
      status: Number(statusValue),
    };

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/tickets');
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || res.statusText));
      }
    } catch (error) {
      alert('Unexpected error: ' + (error as Error).message);
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
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};