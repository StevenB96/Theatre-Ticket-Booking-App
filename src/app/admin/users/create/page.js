import dynamic from 'next/dynamic';

const CreateUserForm = dynamic(
  () => import('./CreateUserForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateUserPage() {
  return (
    <div>
      <h1>Create User</h1>
      <CreateUserForm />
    </div>
  );
};
