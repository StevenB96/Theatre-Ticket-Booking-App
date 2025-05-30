import dynamic from 'next/dynamic';
import { getUserById } from '@/lib/db/user';

const EditUserForm = dynamic(
  () => import('./EditForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditUserPage({ params }) {
  const { id: userId } = await params;
  const user = await getUserById(userId)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit User #{user.id}</h1>
      <EditUserForm user={user} />
    </div>
  );
};
