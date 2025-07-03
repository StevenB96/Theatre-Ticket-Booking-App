// src/models/UserModel.ts
import * as userDomainFunctions from '@/library/db/user';
import { hashPassword } from '@/library/auth';
import type { User, CreateUserInput, UpdateUserInput } from '@/types/user';

export class UserModel {
  public data: User;

  constructor(data: User) {
    this.data = data;
  }

  /** Fetch all users */
  static async findAll(): Promise<UserModel[]> {
    const users = await userDomainFunctions.getAllUsers();
    return users.map((u) => new UserModel(u));
  }

  /** Fetch one user by ID */
  static async load(id: number): Promise<UserModel> {
    const user = await userDomainFunctions.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return new UserModel(user);
  }

  /** Create a new user (hashes password if provided) */
  static async create(input: CreateUserInput): Promise<UserModel> {
    const data = { ...input };
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    const newUser = await userDomainFunctions.createUser(data);
    return new UserModel(newUser);
  }

  /** Update an existing user (hashes password if provided) */
  static async update(id: number, input: UpdateUserInput): Promise<UserModel> {
    const data = { ...input };
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    const updated = await userDomainFunctions.updateUserById(id, data);
    return new UserModel(updated);
  }

  /** Delete a user */
  static async delete(id: number): Promise<void> {
    await userDomainFunctions.deleteUserById(id);
  }
}
