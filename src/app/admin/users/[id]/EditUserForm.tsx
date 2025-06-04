// app/admin/users/[id]/edit/EditUserForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UpdateUserInput } from '@/types/user';

interface EditUserFormProps {
  user: User;
}

export default function EditUserForm({
  user,
}: EditUserFormProps) {
  const [usernameValue, setUsernameValue] = useState<string>(user.username);
  const [emailValue, setEmailValue] = useState<string>(user.email);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [roleValue, setRoleValue] = useState<string>(user.role.toString());
  const [statusValue, setStatusValue] = useState<string>(user.status.toString());

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: UpdateUserInput = {
      id: user.id,
      username: usernameValue,
      email: emailValue,
      role: Number(roleValue),
      status: Number(statusValue)
    };

    if (passwordValue) payload.password = passwordValue;

    const res = await fetch('/api/users/' + user.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/users');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Role:
          <input
            type="number"
            value={roleValue}
            onChange={(e) => setRoleValue(e.target.value)}
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
