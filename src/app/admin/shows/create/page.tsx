// app/admin/shows/create/page.tsx

import React from 'react';
import ShowForm from '../ShowForm';

export default function CreateShowPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Show</h1>
      </div>
      <ShowForm />
    </div>
  );
}
