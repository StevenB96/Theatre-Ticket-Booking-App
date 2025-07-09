// src/app/api/auth/[...nextauth]/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from '@/library/auth';
import db from '@/library/dbClient';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      }
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
    updateAge: 0
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token?.role === 'number') {
        session.user.role = token.role;
      }
      if (session.user && typeof token?.username === 'string') {
        session.user.username = token.username;
      }
      return session;
    }
  },

  pages: {
    signIn: "/login",
  },
};