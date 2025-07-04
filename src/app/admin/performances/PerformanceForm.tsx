// app/admin/performances/PerformanceForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Performance } from '@/types/performance';
import type { Theatre } from '@/types/theatre';
import type { Show } from '@/types/show';
import {
    createPerformanceAction,
    updatePerformanceByIdAction,
} from './actions';

interface PerformanceFormProps {
    performance?: Performance;
    theatres: Theatre[];
    shows: Show[];
}

type FormState = {
    theatre_id: string;
    show_id: string;
    date: string;
    time: string;
    type: string;
    status: string;
};

type Field = {
    key: keyof FormState;
    label: string;
    render: (state: FormState, onChange: (k: keyof FormState, v: string) => void) => React.ReactNode;
};

export default function PerformanceForm({
    performance,
    theatres,
    shows,
}: PerformanceFormProps) {
    const router = useRouter();
    const isEdit = Boolean(performance);

    // parse date/time from existing start_time
    let initDate = '';
    let initTime = '';
    if (performance) {
        const d = new Date(performance.start_time);
        if (!isNaN(d.getTime())) {
            initDate = d.toISOString().slice(0, 10);
            initTime = d.toTimeString().slice(0, 5);
        }
    }

    const [form, setForm] = React.useState<FormState>({
        theatre_id: performance?.theatre_id.toString() ?? '',
        show_id: performance?.theatre_id.toString() ?? '',
        date: initDate,
        time: initTime,
        type: performance?.type.toString() ?? '1',
        status: performance?.status.toString() ?? '1',
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
            key: 'show_id',
            label: 'Show',
            render: (s, onChange) => (
                <select
                    id="show_id"
                    name="show_id"
                    className="form-select"
                    required
                    value={s.show_id}
                    onChange={e => onChange('show_id', e.target.value)}
                >
                    <option value="">Select show</option>
                    {shows.map((show: Show) => (
                        <option key={show.id} value={show.id}>
                            {show.name}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            key: 'date',
            label: 'Date',
            render: (s, onChange) => (
                <input
                    id="date"
                    name="date"
                    type="date"
                    className="form-input"
                    required
                    value={s.date}
                    onChange={e => onChange('date', e.target.value)}
                />
            ),
        },
        {
            key: 'time',
            label: 'Time',
            render: (s, onChange) => (
                <input
                    id="time"
                    name="time"
                    type="time"
                    className="form-input"
                    required
                    value={s.time}
                    onChange={e => onChange('time', e.target.value)}
                />
            ),
        },
        {
            key: 'type',
            label: 'Type',
            render: (s, onChange) => (
                <select
                    id="type"
                    name="type"
                    className="form-select"
                    required
                    value={s.type}
                    onChange={e => onChange('type', e.target.value)}
                >
                    <option value="1">Evening</option>
                    <option value="0">Matinee</option>
                </select>
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
        <form action={isEdit ? updatePerformanceByIdAction : createPerformanceAction}>
            {isEdit && <input type="hidden" name="id" value={performance!.id} />}

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
                    onClick={() => isEdit ? router.push('/admin/performances') : router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
