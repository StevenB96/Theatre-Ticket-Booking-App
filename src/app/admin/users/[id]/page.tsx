// app/admin/users/[id]/page.tsx

import React from 'react';
import UserForm from '../UserForm';
import { getUserById } from '@/library/db/user';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const user = await getUserById(id);

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
        <p>No user exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit User #{user.id}</h1>
      </div>
      <UserForm user={user} />
    </div>
  );
}
