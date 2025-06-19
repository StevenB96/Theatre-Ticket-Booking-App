// app/admin/users/[id]/edit/page.tsx

import { getUserById } from '@/library/db/user';
import EditUserForm from './EditUserForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(parseInt(id, 10));

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
      <h1>Edit User #{user.id}</h1>
      <EditUserForm user={user} />
    </div>
  );
}
