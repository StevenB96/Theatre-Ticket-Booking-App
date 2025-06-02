import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import { redirect } from "next/navigation";
import LayoutClient from "./layout.client";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 1) {
    redirect("/login");
  }

  return <LayoutClient>{children}</LayoutClient>;
}
