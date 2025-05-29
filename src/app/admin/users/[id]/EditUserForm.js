'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function EditUserForm({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { username, email };
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
  }

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
          Password (leave blank to keep):
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        </label>
      </div>

      <div className="space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
