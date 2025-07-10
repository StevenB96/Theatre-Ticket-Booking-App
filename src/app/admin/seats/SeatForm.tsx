// app/admin/seats/SeatForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Seat } from '@/types/seat';
import type { Theatre } from '@/types/theatre';
import { createSeatAction, updateSeatByIdAction } from './actions';

interface SeatFormProps {
    seat?: Seat;
    theatres: Theatre[]
}

type FormState = {
    theatre_id: string;
    code: string;
    zone: string;
    status: string;
};

type Field = {
    key: keyof FormState;
    label: string;
    render: (state: FormState, onChange: (k: keyof FormState, v: string) => void) => React.ReactNode;
};

export default function SeatForm({ seat, theatres }: SeatFormProps) {
    const router = useRouter();
    const isEdit = Boolean(seat);

    const [form, setForm] = React.useState<FormState>({
        theatre_id: seat?.theatre_id.toString() ?? '',
        code: seat?.code ?? '',
        zone: seat?.zone ?? '',
        status: seat?.status.toString() ?? '1',
    });

    const handleChange = (key: keyof FormState, val: string) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const fields: Field[] = [
        {
            key: 'theatre_id',
            label: 'Theatre',
            render: (s, onChange) => (
                <select
                    id="theatre_id"
                    name="theatre_id"
                    className="form-select"
                    required
                    value={s.theatre_id}
                    onChange={e => onChange('theatre_id', e.target.value)}
                >
                    <option value="">Select theatre</option>
                    {theatres.map((theatre: Theatre) => (
                        <option key={theatre.id} value={theatre.id}>
                            {theatre.name}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            key: 'code',
            label: 'Code',
            render: (s, onChange) => (
                <input
                    id="code"
                    name="code"
                    type="text"
                    className="form-input"
                    required
                    value={s.code}
                    onChange={e => onChange('code', e.target.value)}
                />
            ),
        },
        {
            key: 'zone',
            label: 'Zone',
            render: (s, onChange) => (
                <input
                    id="zone"
                    name="zone"
                    type="text"
                    className="form-input"
                    required
                    value={s.zone}
                    onChange={e => onChange('zone', e.target.value)}
                />
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (s, onChange) => (
                <select
                    id="status"
                    name="status"
                    className="form-select"
                    required
                    value={s.status}
                    onChange={e => onChange('status', e.target.value)}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            ),
        },
    ];

    return (
        <form action={isEdit ? updateSeatByIdAction : createSeatAction}>
            {isEdit && <input type="hidden" name="id" value={seat!.id} />}

            {fields.map(f => (
                <div key={f.key} className="form-group">
                    <label htmlFor={f.key} className="form-label">
                        {f.label}
                    </label>
                    {f.render(form, handleChange)}
                </div>
            ))}

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {isEdit ? 'Save' : 'Create'}
                </button>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => isEdit ? router.push('/admin/seats') : router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
