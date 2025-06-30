// app/admin/users/UserForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import { createUserAction, updateUserByIdAction } from './actions';

interface UserFormProps {
    user?: User;
}

type FormState = {
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
};

type Field = {
    key: keyof FormState;
    label: string;
    render: (state: FormState, onChange: (k: keyof FormState, v: string) => void) => React.ReactNode;
};

export default function UserForm({ user }: UserFormProps) {
    const router = useRouter();
    const isEdit = Boolean(user);

    const [form, setForm] = React.useState<FormState>({
        username: user?.username ?? '',
        email: user?.email ?? '',
        password: '',
        role: user?.role.toString() ?? '0',
        status: user?.status.toString() ?? '1',
    });

    const handleChange = (key: keyof FormState, val: string) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const fields: Field[] = [
        {
            key: 'username',
            label: 'Username',
            render: (s, onChange) => (
                <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-input"
                    required
                    value={s.username}
                    onChange={e => onChange('username', e.target.value)}
                />
            ),
        },
        {
            key: 'email',
            label: 'Email',
            render: (s, onChange) => (
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    required
                    value={s.email}
                    onChange={e => onChange('email', e.target.value)}
                />
            ),
        },
        {
            key: 'password',
            label: 'Password',
            render: (s, onChange) => (
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-input"
                    {...(isEdit ? {} : { required: true })}
                    value={s.password}
                    onChange={e => onChange('password', e.target.value)}
                />
            ),
        },
        {
            key: 'role',
            label: 'Role',
            render: (s, onChange) => (
                <select
                    id="role"
                    name="role"
                    className="form-select"
                    required
                    value={s.role}
                    onChange={e => onChange('role', e.target.value)}
                >
                    <option value="1">Admin</option>
                    <option value="0">User</option>
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
        <form action={isEdit ? updateUserByIdAction : createUserAction}>
            {isEdit && <input type="hidden" name="id" value={user!.id} />}

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
                    onClick={() => isEdit ? router.push('/admin/users') : router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
