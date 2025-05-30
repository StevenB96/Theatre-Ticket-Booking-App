'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      router.push('/admin/users');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div className="space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};
