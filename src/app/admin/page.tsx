// src/app/admin/users/page.tsx
import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps): JSX.Element {
  return <div>{children}</div>;
}
