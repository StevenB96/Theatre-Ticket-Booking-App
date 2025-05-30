import dynamic from 'next/dynamic';

const CreateUserForm = dynamic(
  () => import('./CreateUserForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateUserPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <CreateUserForm />
    </div>
  );
};
