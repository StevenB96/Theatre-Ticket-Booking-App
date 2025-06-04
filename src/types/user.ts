// src/types/user.ts
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  role: number;
  status: number;
}

export interface UpdateUserInput {
  id: number;
  username: string;
  email: string;
  password?: string;
  password_hash?: string;
  role: number;
  status: number;
}