// app/admin/users/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getUserById } from '@/library/db/user';

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

const EditUserForm = dynamic(() => import('./EditUserForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditUserPage({
  params,
}: EditUserPageProps): Promise<ReactNode> {
  const { id } = await params;
  const userIdFromUrl = parseInt(id, 10);
  const user = await getUserById(userIdFromUrl);

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
        <p>No user exists with ID #{userIdFromUrl}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit User #{user.id}</h1>
      <EditUserForm user={user} />
    </div>
  );
};