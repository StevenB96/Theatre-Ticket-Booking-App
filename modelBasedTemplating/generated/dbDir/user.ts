// src/library/db/user.ts
const db = require('../dbClient');
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
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
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
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. status: input.status,
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return newUser;
}

// Update an existing user
export async function updateUser(
  id: number,
  data: UpdateUserInput
): Promise<User> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedUser] = await db<User>('user')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return updatedUser;
}

// Delete an existing user
export async function deleteUser(id: number): Promise<void> {
  await db('user').where({ id }).del();
}