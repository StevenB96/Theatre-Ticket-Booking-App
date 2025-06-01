const db = require('../dbClient.js'); // Knex instance

// Get all theatres
async function getAllTheatres() {
  return db('theatre')
    .select(
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at')
    .orderBy('id', 'asc');
}

// Get one theatre by ID
async function getTheatreById(id) {
  return db('theatre')
    .where({ id })
    .first();
}

// Create a new theatre
async function createTheatre({ name, address, status }) {
  const [newTheatre] = await db('theatre')
    .insert({
      name,
      address,
      status
    })
    .returning([
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at'
    ]);
  return newTheatre;
}

// Update an existing theatre
async function updateTheatre(id, data) {
  const [updatedTheatre] = await db('theatre')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at'
    ]);
  return updatedTheatre;
}

// Delete a theatre
async function deleteTheatre(id) {
  await db('theatre')
    .where({ id })
    .del();
}

module.exports = {
  getAllTheatres,
  getTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre,
};
