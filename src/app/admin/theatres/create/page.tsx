// app/admin/theatres/create/page.tsx

import React from 'react';
import TheatreForm from '../TheatreForm';

export default function CreateTheatrePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Theatre</h1>
      </div>
      <TheatreForm />
    </div>
  );
}
