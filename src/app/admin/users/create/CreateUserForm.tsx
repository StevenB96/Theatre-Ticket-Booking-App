// app/admin/users/create/CreateUserForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUserForm() {
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [roleValue, setRoleValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      role: Number(roleValue),
      status: Number(statusValue)
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/users');
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
            required
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
        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};