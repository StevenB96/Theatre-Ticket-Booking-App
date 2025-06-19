// app/admin/users/create/CreateUserForm.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createUserAction } from '../actions';

export default function CreateUserForm() {
  const router = useRouter();

  return (
    <form action={createUserAction}>
      <div>
        <label>
          Username:
          <input
            id="username"
            name="username"
            type="text"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            id="email"
            name="email"
            type="email"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Role:
          <input
            id="role"
            name="role"
            type="number"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <input
            id="status"
            name="status"
            type="number"
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
