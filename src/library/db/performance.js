const db = require('../dbClient.js'); // Knex instance

// Get all performances
async function getAllPerformances() {
  return db('performance')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    )
    .orderBy('id', 'asc');
}

// Get one performance by ID
async function getPerformanceById(id) {
  return db('performance')
    .where({ id })
    .first();
}

// Create a new performance
async function createPerformance({
  theatre_has_show_id,
  start_time,
  type,
  status,
}) {
  const [newPerformance] = await db('performance')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
      theatre_has_show_id,
      start_time,
      type,
      status,
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);
  return newPerformance;
}

// Update an existing performance
async function updatePerformance(id, data) {
  const [updatedPerformance] = await db('performance')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);
  return updatedPerformance;
}

// Delete a performance
async function deletePerformance(id) {
  await db('performance')
    .where({ id })
    .del();
}

module.exports = {
  getAllPerformances,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformance,
};