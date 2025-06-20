// src/library/db/user.ts
import db from '@/library/dbClient';
import type {
  User,
  CreateUserInput,
  UpdateUserInput,
} from '@/types/user';

// Get all users
export async function getAllUsers(): Promise<User[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<User>('user')
    .select(
      'id',
      'username',
      'email',
      'role',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one user by ID
export async function getUserById(
  id: number
): Promise<User | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<User>('user').where({ id }).first();
}

// Create a new user
export async function createUser(
  input: CreateUserInput
): Promise<User> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newUser] = await db<User>('user')
    .insert({
      username: input.username,
      email: input.email,
      password_hash: input.password,
      role: input.role,
      status: input.status,
    })
    .returning([
      'id',
      'username',
      'email',
      'role',
      'status',
      'created_at',
      'updated_at'
    ]);

  return newUser;
}

// Update an existing user
export async function updateUserById(
  id: number,
  data: UpdateUserInput
): Promise<User> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedUser] = await db<User>('user')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'username',
      'email',
      'role',
      'status',
      'created_at',
      'updated_at'
    ]);

  return updatedUser;
}

// Delete an existing user
export async function deleteUserById(id: number): Promise<void> {
  await db('user').where({ id }).del();
}