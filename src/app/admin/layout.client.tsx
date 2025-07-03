// src/app/admin/layout.client.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
import "./admin.css";

interface LayoutClientProps {
  children: ReactNode;
}

const CRUDLinks = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/theatres", label: "Theatres" },
  { href: "/admin/shows", label: "Shows" },
  { href: "/admin/performances", label: "Performances" },
  { href: "/admin/seats", label: "Seats" },
  { href: "/admin/tickets", label: "Tickets" },
];

const additionalLinks = [
  { href: "/admin/analytics", label: "Analytics" },
];

export default function LayoutClient({ children }: LayoutClientProps) {
  const { data: session } = useSession() as { data: Session | null };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="layout-sidebar">
        <nav className="nav">
          <h1 className="nav-username">
            {session?.user?.username ? `Hello, ${session.user.username}` : "Loading..."}
          </h1>

          <hr />

          {CRUDLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="link">
              {label}
            </Link>
          ))}

          <hr />

          {additionalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="link">
              {label}
            </Link>
          ))}

          <hr />

          <button onClick={handleLogout}>Log Out</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="layout-main">{children}</main>
    </div>
  );
}
