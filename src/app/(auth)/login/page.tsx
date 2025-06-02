'use client';

import { signIn, getSession, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import type { Session } from 'next-auth';

interface UserWithRole {
  name?: string;
  email?: string;
  role: number;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // 1) Attempt to sign in without automatically redirecting
    const res: SignInResponse | undefined = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      setError('Invalid email or password.');
      return;
    }

    // 2) signIn succeeded. Now fetch the session so we can read `role`.
    const session: Session | null = await getSession();
    if (!session || !session.user) {
      setError('Unable to retrieve session.');
      return;
    }

    // 3) Check role (assuming `1 === admin`)
    const user = session.user as UserWithRole;
    if (user.role === 1) {
      router.push('/admin');
    } else {
      setError('You do not have permission to access the dashboard.');
    }
  }

  return (
    <div>
      <h1>Login </h1>
      {error && <p style={{ color: 'red' }}> {error} </p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" > Sign In </button>
      </form>
    </div>
  );
}
