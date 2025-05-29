// src/app/admin/layout.js

import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div>
      <Link href="/admin/theatres">
        <button>Theatres</button>
      </Link>
      <Link href="/admin/shows">
        <button>Shows</button>
      </Link>
      <Link href="/admin/performances">
        <button>Performances</button>
      </Link>
      <Link href="/admin/seats">
        <button>Seats</button>
      </Link>
      <Link href="/admin/users">
        <button>Users</button>
      </Link>
      <Link href="/admin/tickets">
        <button>Tickets</button>
      </Link>
      {children}
    </div>
  );
}