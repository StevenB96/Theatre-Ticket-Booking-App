// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '@/library/auth';
import db from '@/library/dbClient.ts';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        // 1) Fetch user row via Knex
        const user = await db('user')
          .where({ email: credentials.email })
          .first();

        if (!user) {
          throw new Error('No user found');
        }

        // 2) Verify password
        const isValid = await verifyPassword(
          credentials.password,
          user.password_hash
        );
        if (!isValid) {
          throw new Error('Invalid password');
        }

        // 3) Return id, email, and role
        //   —anything you return here becomes part of the "token" on first sign‐in.
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },

  callbacks: {
    /**
     * The `jwt` callback is called whenever a new JWT is created (on sign‐in),
     * or whenever it’s “checked” on subsequent requests. Here, we copy `user.role`
     * into `token.role` (only on first sign‐in). On subsequent requests, `user` is
     * undefined, so we simply leave `token.role` as is.
     */
    async jwt({ token, user }) {
      if (user) {
        // On initial sign‐in, `user` is the object returned from `authorize()`.
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },

    /**
     * The `session` callback is called whenever `getSession()` or `useSession()` is invoked.
     * We copy `token.role` into `session.user.role` so the client can read it.
     */
    async session({ session, token }) {
      if (token.role !== undefined) {
        session.user.role = token.role;
      };
      if (token.username !== undefined) {
        session.user.username = token.username;
      };
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
