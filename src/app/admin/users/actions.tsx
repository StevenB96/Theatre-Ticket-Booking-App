// app/admin/users/actions.ts
'use server';

import { UserModel } from '@/models/UserModel';
import type {
  CreateUserInput,
  UpdateUserInput,
} from '@/types/user';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new user.
 * - Redirects to the newly created user's page.
 * - Revalidates the "/admin/users" path.
 */
export async function createUserAction(formData: FormData) {
  const username = String(formData.get('username'));
  if (username === null) throw new Error('Username is required');

  const email = String(formData.get('email'));
  if (email === null) throw new Error('Email is required');

  const password = String(formData.get('password'));
  if (!password) throw new Error('Password is required');

  const role = Number(formData.get('role'));
  if (role === null) throw new Error('Role is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: CreateUserInput = {
    username,
    email,
    password,
    role,
    status,
  };

  const user = await UserModel.create(input);
  revalidatePath('/admin/users/' + user.id);
  redirect('/admin/users/' + user.id);
}

/**
 * Server action to update an existing user by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/users" path.
 */
export async function updateUserByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (id === null) throw new Error('ID is required');

  const username = String(formData.get('username'));
  if (username === null) throw new Error('Username is required');

  const password = String(formData.get('password'));

  const email = String(formData.get('email'));
  if (email === null) throw new Error('Email is required');

  const role = Number(formData.get('role'));
  if (role === null) throw new Error('Role is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: UpdateUserInput = {
    id,
    username,
    email,
    role,
    status,
  };

  if (password) {
    input.password = password;
  }

  const user = await UserModel.update(id, input);
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

/**
 * Server action to delete a user by ID.
 * - Revalidates the "/admin/users" path after deletion.
 */
export async function deleteUserByIdAction(formData: FormData) {
  const id = Number(formData.get('userId'));
  if (!id) return;

  await UserModel.delete(id);
  revalidatePath('/admin/users');
};
