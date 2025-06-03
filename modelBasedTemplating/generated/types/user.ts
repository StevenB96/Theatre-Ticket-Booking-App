// src/types/user.ts
export interface User {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. id: number;
  */
}

export interface CreateUserInput {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. status: number;
  */
}

export interface UpdateUserInput extends CreateUserInput {
  id: number;
}