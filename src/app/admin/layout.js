import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
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
            className={styles.link}>
            Seats
          </Link>
          <Link
            href="/admin/tickets"
            className={styles.link}>
            Tickets
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};
