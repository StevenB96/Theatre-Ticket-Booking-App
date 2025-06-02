const db = require('../dbClient.ts'); // Knex instance

// Get all seats
async function getAllSeats() {
  return db('seat')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
    )
    .orderBy('id', 'asc');
}

// Get one seat by ID
async function getSeatById(id) {
  return db('seat')
    .where({ id })
    .first();
}

// Create a new seat
async function createSeat({
  theatre_id,
  code,
  zone,
  status,
}) {
  const [newSeat] = await db('seat')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
      theatre_id,
      code,
      zone,
      status,
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
    ]);
  return newSeat;
}

// Update an existing seat
async function updateSeat(id, data) {
  const [updatedSeat] = await db('seat')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
    ]);
  return updatedSeat;
}

// Delete a seat
async function deleteSeat(id) {
  await db('seat')
    .where({ id })
    .del();
}

module.exports = {
  getAllSeats,
  getSeatById,
  createSeat,
  updateSeat,
  deleteSeat,
};