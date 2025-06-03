// app/admin/users/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateUserForm = dynamic(
  () => import('./CreateUserForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateUserPage(): ReactNode {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
    </div>
  );
};