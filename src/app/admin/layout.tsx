// src/app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LayoutClient from "./layout.client";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role !== 1
  ) {
    redirect("/login");
  }

  return <LayoutClient>{children}</LayoutClient>;
}
