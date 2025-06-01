const db = require('../dbClient.js'); // Knex instance

// Get all shows
async function getAllShows() {
  return db('show')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one show by ID
async function getShowById(id) {
  return db('show')
    .where({ id })
    .first();
}

// Create a new show
async function createShow({ name, status }) {
  const [newShow] = await db('show')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
      name,
      status,
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    ]);
  return newShow;
}

// Update an existing show
async function updateShow(id, data) {
  const [updatedShow] = await db('show')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    ]);
  return updatedShow;
}

// Delete a show
async function deleteShow(id) {
  await db('show')
    .where({ id })
    .del();
}

module.exports = {
  getAllShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow,
};