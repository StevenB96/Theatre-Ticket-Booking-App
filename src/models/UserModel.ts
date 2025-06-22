import * as userDomainFunctions from '@/library/db/user';
import { hashPassword } from '@/library/auth';
import type { User, CreateUserInput, UpdateUserInput } from '@/types/user';

export interface IUserModel {
  list(): Promise<User[]>;
  create(input: CreateUserInput): Promise<UserModel>;
  find(id: number): Promise<UserModel | null>;
  update(id: number, input: UpdateUserInput): Promise<UserModel>;
  delete(id: number): Promise<void>;
}

export class UserModel {
  data: User | null = null;
  id: number | null = null;

  constructor(id?: number) {
    this.id = id ?? null;
  }

  async init(): Promise<void> {
    if (this.id === null) {
      this.data = null;
      return;
    }
    const user = await userDomainFunctions.getUserById(this.id);
    this.data = user ?? null;
  }

  static async list(): Promise<User[]> {
    return userDomainFunctions.getAllUsers();
  }

  static async create(input: CreateUserInput): Promise<UserModel> {
    const updateData = { ...input };

    if (input.password) {
      const password = await hashPassword(input.password);
      updateData.password = password;
    }

    const newUser = await userDomainFunctions.createUser(updateData);
    const model = new UserModel(newUser.id);
    model.data = newUser;
    return model;
  }

  static async find(id: number): Promise<UserModel | null> {
    const user = await userDomainFunctions.getUserById(id);
    if (!user) return null;
    const model = new UserModel(id);
    model.data = user;
    return model;
  }

  // Static update method takes id and input explicitly
  static async update(id: number, input: UpdateUserInput): Promise<UserModel> {
    // Hash password if provided
    if (input.password) {
      input.password = await hashPassword(input.password);
    }

    const updated = await userDomainFunctions.updateUserById(id, input);
    const model = new UserModel(id);
    model.data = updated;
    return model;
  }

  // Static delete method takes id explicitly
  static async delete(id: number): Promise<void> {
    await userDomainFunctions.deleteUserById(id);
  }
}
