// src/app/Providers.js
'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * A simple Client Component that wraps children in NextAuth’s SessionProvider.
 */
export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
