'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';
import type { Seat } from '@/types/seat';
import type { PerformanceWithRelations } from '@/types/performance';
import type { User } from '@/types/user';
import { updateTicketByIdAction } from '../actions';

interface EditTicketFormProps {
  ticket: Ticket;
  users: User[];
  seats: Seat[];
  performances: PerformanceWithRelations[];
}

type SelectOption = { label: string; value: string | number };

export default function EditTicketForm({
  users,
  seats,
  performances,
  ticket,
}: EditTicketFormProps) {
  const router = useRouter();

  const [formState, setFormState] = useState({
    user_id: ticket.user_id.toString(),
    seat_id: ticket.seat_id.toString(),
    performance_id: ticket.performance_id.toString(),
    price: ticket.price.toString(),
    status: ticket.status.toString(),
  });

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const fields: {
    name: keyof typeof formState;
    label: string;
    type: 'select' | 'number';
    options?: SelectOption[];
  }[] = [
      {
        name: 'user_id',
        label: 'User',
        type: 'select',
        options: users.map((u) => ({ label: u.username, value: u.id.toString() })),
      },
      {
        name: 'seat_id',
        label: 'Seat',
        type: 'select',
        options: seats.map((s) => ({ label: s.code, value: s.id.toString() })),
      },
      {
        name: 'performance_id',
        label: 'Performance',
        type: 'select',
        options: performances.map((p) => ({
          label: `${p.show?.name} - ${p.theatre?.name}`,
          value: p.id.toString(),
        })),
      },
      {
        name: 'price',
        label: 'Price',
        type: 'number',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Active', value: '1' },
          { label: 'Inactive', value: '0' },
        ],
      },
    ];

  return (
    <form action={updateTicketByIdAction}>
      <input type="hidden" name="id" value={ticket.id} />

      {fields.map(({ name, label, type, options }) => (
        <div key={name} className="form-group">
          <label htmlFor={name} className="form-label">
            {label}:
          </label>

          {type === 'select' ? (
            <select id={name} name={name} className="form-select" required>
              {options?.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              className="form-input"
              required
            />
          )}
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" onClick={() => router.push('/admin/tickets')} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
