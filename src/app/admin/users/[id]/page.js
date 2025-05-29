import { getUserById } from '@/lib/db/user';
import EditUserForm from './EditUserForm';

export default async function EditUserPage({ params }) {
  const user = await getUserById(Number(params.id));

  if (!user) {
    // Optional: redirect to 404
    return <div>User not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit User #{user.id}</h1>
      <EditUserForm user={user} />
    </div>
  );
}
