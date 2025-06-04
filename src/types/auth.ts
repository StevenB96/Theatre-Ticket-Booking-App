// --- src/types/auth.ts ---
import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extend NextAuth’s built-in User type so that 
   * `user.id`, `user.email`, `user.username`, and `user.role` exist.
   */
  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string;
    role: string;
  }

  /**
   * Extend NextAuth’s Session type so that the `session.user` object
   * always has `id`, `email`, `username`, and `role`.
   */
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      role: string;

      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the JWT payload so it carries `id`, `email`, `username`, and `role` 
   * whenever you sign a token in `callbacks.jwt`.
   */
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    role?: string;
  }
}
