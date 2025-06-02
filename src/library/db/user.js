const db = require('../dbClient.ts'); // Knex instance
import { hashPassword } from '@/library/auth.ts'

// Get all users
async function getAllUsers() {
  return db('user')
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
async function getUserById(id) {
  return db('user')
    .where({
      id
    })
    .first();
}

// Create a new user
async function createUser({
  username,
  email,
  password,
  role,
  status,
}) {
  const password_hash = await hashPassword(password);
  const [newUser] = await db('user')
    .insert({
      username,
      email,
      password_hash,
      role,
      status,
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
async function updateUser(id, data) {
  const updateData = data;

  if (data.password) {
    const password_hash = await hashPassword(data.password);
    updateData.password_hash = password_hash;
  };

  delete updateData['password'];

  const [updatedUser] = await db('user')
    .where({
      id
    })
    .update(updateData)
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

// Delete a user
async function deleteUser(id) {
  await db('user')
    .where({
      id
    })
    .del();
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
