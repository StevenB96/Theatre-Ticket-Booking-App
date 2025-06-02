'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './layout.module.css';

export default function LayoutClient({ children }) {
  const { data: session } = useSession();
  console.log(session)

  const handleLogout = (e) => {
    e.preventDefault();  // prevent default link navigation
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <div className={styles.username}>
            {session?.user?.username ? `Hello, ${session.user.username}` : 'Loading...'}
          </div>
          <Link
            href="/admin/users"
            className={styles.link}>
            Users
          </Link>
          <Link
            href="/admin/theatres"
            className={styles.link}>
            Theatres
          </Link>
          <Link
            href="/admin/shows"
            className={styles.link}>
            Shows
          </Link>
          <Link
            href="/admin/performances"
            className={styles.link}>
            Performances
          </Link>
          <Link
            href="/admin/seats"
            className={styles.link}
          >Seats
          </Link>
          <Link
            href="/admin/tickets"
            className={styles.link}>
            Tickets
          </Link>
          <Link
            href="#"
            onClick={handleLogout}
            className={styles.link}>
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
