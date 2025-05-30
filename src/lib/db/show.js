const db = require('../dbClient.js'); // Knex instance

// Get all shows
async function getAllShows() {
  return db('show')
    .select(
    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g. 'id','
    */
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
async function createShow({ name, address }) {
  const [newShow] = await db('show')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
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