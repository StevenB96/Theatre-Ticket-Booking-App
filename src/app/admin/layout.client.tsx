// src/app/admin/layout.client.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
import styles from "./layout.module.css";

interface LayoutClientProps {
  children: ReactNode;
}

const links = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/theatres", label: "Theatres" },
  { href: "/admin/shows", label: "Shows" },
  { href: "/admin/performances", label: "Performances" },
  { href: "/admin/seats", label: "Seats" },
  { href: "/admin/tickets", label: "Tickets" },
];

export default function LayoutClient({ children }: LayoutClientProps) {
  const { data: session } = useSession() as { data: Session | null };

  const handleLogout = () => {
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

          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>
              {label}
            </Link>
          ))}

          <button onClick={handleLogout}>Log Out</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
