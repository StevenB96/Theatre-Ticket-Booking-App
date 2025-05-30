import dynamic from 'next/dynamic';
import { getUserById } from '@/lib/db/user';

const EditUserForm = dynamic(
  () => import('./EditUserForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditUserPage({ params }) {
  const { id: userId } = await params;
  const user = await getUserById(userId)

  return (
    <div>
      <h1>Edit User #{user.id}</h1>
      <EditUserForm user={user} />
    </div>
  );
};
