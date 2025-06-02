'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUserForm({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username,
      email,
      role,
      status
    };

    if (password) payload.password = password;

    const res = await fetch(`/api/users/${user.id}`, {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password (leave blank to keep):
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Role:
          <input
            type="number"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <input
            type="number"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">
          Save
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
