// app/admin/users/[id]/edit/EditUserForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import { updateUserByIdAction } from '../actions';

interface EditUserFormProps {
  user: User;
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const router = useRouter();

  const [usernameValue, setUsernameValue] = useState<string>(String(user.username));
  const [emailValue, setEmailValue] = useState<string>(String(user.email));
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [roleValue, setRoleValue] = useState<string>(String(user.role.toString()));
  const [statusValue, setStatusValue] = useState<string>(String(user.status.toString()));

  return (
    <form action={updateUserByIdAction}>
      <input type="hidden" name="id" value={user.id} />

      <div>
        <label>
          Username:
          <input
            id="username"
            name="username"
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
            id="email"
            name="email"
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
            id="password"
            name="password"
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
            id="role"
            name="role"
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
            id="status"
            name="status"
            type="number"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/users')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
