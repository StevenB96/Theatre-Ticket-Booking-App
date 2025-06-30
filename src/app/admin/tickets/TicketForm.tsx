// app/admin/tickets/TicketForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Ticket } from '@/types/ticket';
import type { Seat } from '@/types/seat';
import type { PerformanceWithRelations } from '@/types/performance';
import type { User } from '@/types/user';
import { updateTicketByIdAction, createTicketAction } from './actions';

interface TicketFormProps {
  ticket?: Ticket;
  users: User[];
  seats: Seat[];
  performances: PerformanceWithRelations[];
}

type SelectOption = { label: string; value: string | number };

// Generates the form fields array based on props
function getFormFields(
  users: User[],
  seats: Seat[],
  performances: PerformanceWithRelations[]
): {
  name: keyof FormState;
  label: string;
  type: 'select' | 'number';
  options?: SelectOption[];
}[] {
  return [
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
}

type FormState = {
  user_id: string;
  seat_id: string;
  performance_id: string;
  price: string;
  status: string;
};

export default function TicketForm({
  users,
  seats,
  performances,
  ticket,
}: TicketFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(ticket);

  // Initialize form state, prefilling with ticket data if editing
  const [formState, setFormState] = useState<FormState>({
    user_id: ticket?.user_id.toString() ?? '',
    seat_id: ticket?.seat_id.toString() ?? '',
    performance_id: ticket?.performance_id.toString() ?? '',
    price: ticket?.price.toString() ?? '',
    status: ticket?.status.toString() ?? '1',
  });

  const fields = getFormFields(users, seats, performances);

  // Update form state on input change
  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Render input based on field type
  const renderInput = ({
    name,
    type,
    options,
  }: {
    name: keyof FormState;
    type: 'select' | 'number';
    options?: SelectOption[];
  }) => {
    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          className="form-select"
          required
          value={formState[name]}
          onChange={(e) => handleChange(name, e.target.value)}
        >
          <option value="">Select {name.replace('_', ' ')}</option>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={type}
        className="form-input"
        required
        value={formState[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        min={type === 'number' ? 0 : undefined}
        step={type === 'number' ? 'any' : undefined}
      />
    );
  };

  return (
    <form action={isEditMode ? updateTicketByIdAction : createTicketAction}>
      {isEditMode && <input type="hidden" name="id" value={ticket?.id} />}

      {fields.map(({ name, label, type, options }) => (
        <div key={name} className="form-group">
          <label htmlFor={name} className="form-label">
            {label}:
          </label>
          {renderInput({ name, type, options })}
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {isEditMode ? 'Save' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/tickets')}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
