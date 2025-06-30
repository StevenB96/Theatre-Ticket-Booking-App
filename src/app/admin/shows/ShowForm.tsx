// app/admin/shows/ShowForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Show } from '@/types/show';
import { createShowAction, updateShowByIdAction } from './actions';

interface ShowFormProps {
    show?: Show;
}

type FormState = {
    name: string;
    status: string;
};

type Field = {
    key: keyof FormState;
    label: string;
    render: (state: FormState, onChange: (k: keyof FormState, v: string) => void) => React.ReactNode;
};

export default function ShowForm({ show }: ShowFormProps) {
    const router = useRouter();
    const isEdit = Boolean(show);

    const [form, setForm] = React.useState<FormState>({
        name: show?.name ?? '',
        status: show?.status.toString() ?? '1',
    });

    const handleChange = (key: keyof FormState, val: string) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const fields: Field[] = [
        {
            key: 'name',
            label: 'Name',
            render: (s, onChange) => (
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    required
                    value={s.name}
                    onChange={e => onChange('name', e.target.value)}
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
        <form action={isEdit ? updateShowByIdAction : createShowAction}>
            {isEdit && <input type="hidden" name="id" value={show!.id} />}

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
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
