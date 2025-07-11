// src/app/admin/layout.client.tsx
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
import { ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  { href: "/admin/about", label: "About The Project" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/ticket-sales", label: "Ticket Sales Visualisation" },
];

export default function LayoutClient({ children }: LayoutClientProps) {
  const router = useRouter();
  const { data: session } = useSession() as { data: Session | null };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleDirectToHomePage = () => {
    router.push('/');
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
            <Link href={href} className="link">
              {label}
            </Link>
          ))}

          <hr />

          {additionalLinks.map(({ href, label }) => (
            <Link href={href} className="link">
              {label}
            </Link>
          ))}

          <hr />

          <button className="btn-primary" onClick={handleLogout}>Log Out</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="layout-main">{children}</main>

      <button style={{
        position: "absolute",
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        margin: 10,
      }}
        className="btn-secondary"
        onClick={handleDirectToHomePage}
      >
        <p>Go to User site</p>
        <ExternalLink />
      </button >
    </div>
  );
}
