// app/admin/users/create/page.tsx

import React from 'react';
import UserForm from '../UserForm';

export default function CreateUserPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create User</h1>
      </div>
      <UserForm />
    </div>
  );
}
