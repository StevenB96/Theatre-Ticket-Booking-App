'use client';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // 1) Attempt to sign in without automatically redirecting
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      setError('Invalid email or password.');
      return;
    };

    // 2) signIn succeeded. Now fetch the session so we can read `role`.
    const session = await getSession();
    if (!session) {
      setError('Unable to retrieve session.');
      return;
    };

    // 3) Check role (assuming `1 === admin`)
    if (session.user.role === 1) {
      router.push('/admin');
    } else {
      setError('You do not have permission to access the dashboard.');
    };
  };

  return (
    <div>
      <h1>Login</h1>
      {error && error}
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};