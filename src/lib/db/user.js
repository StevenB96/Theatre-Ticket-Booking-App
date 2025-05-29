const db = require('../dbClient.js'); // Knex instance
import { hashPassword } from '@/lib/auth.js'

// Get all users
async function getAllUsers() {
  return db('user')
    .select(
      'id',
      'username',
      'email',
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
  password
}) {
  const password_hash = hashPassword(password);
  const [newUser] = await db('user')
    .insert({
      username,
      email,
      password_hash
    })
    .returning([
      'id',
      'username',
      'email',
      'created_at',
      'updated_at'
    ]);
  return newUser;
}

// Update an existing user
async function updateUser(id, data) {
  const [updatedUser] = await db('user')
    .where({
      id
    })
    .update(data)
    .returning([
      'id',
      'username',
      'email',
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
