// src/app/admin/layout.client.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode, MouseEvent } from "react";
import type { Session } from "next-auth";
import styles from "./layout.module.css";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps): JSX.Element {
  // `data` can be Session or null
  const { data: session } = useSession() as { data: Session | null };

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <div className={styles.username}>
            {session?.user?.username ? `Hello, ${session.user.username}` : "Loading..."}
          </div>
          <Link href="/admin/users" className={styles.link}>
            Users
          </Link>
          <Link href="/admin/theatres" className={styles.link}>
            Theatres
          </Link>
          <Link href="/admin/shows" className={styles.link}>
            Shows
          </Link>
          <Link href="/admin/performances" className={styles.link}>
            Performances
          </Link>
          <Link href="/admin/seats" className={styles.link}>
            Seats
          </Link>
          <Link href="/admin/tickets" className={styles.link}>
            Tickets
          </Link>
          <Link href="#" onClick={handleLogout} className={styles.link}>
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
