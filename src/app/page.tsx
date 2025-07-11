// src/app/page.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user
  ) {
    redirect("/login");
  }

  return (
    <p>TBA</p>
  );
}
