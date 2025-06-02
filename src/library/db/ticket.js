const db = require('../dbClient.ts'); // Knex instance

// Get all tickets
async function getAllTickets() {
  return db('ticket')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one ticket by ID
async function getTicketById(id) {
  return db('ticket')
    .where({ id })
    .first();
}

// Create a new ticket
async function createTicket({
  user_id,
  seat_id,
  performance_id,
  price,
  status,
}) {
  const [newTicket] = await db('ticket')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
      user_id,
      seat_id,
      performance_id,
      price,
      status,
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    ]);
  return newTicket;
}

// Update an existing ticket
async function updateTicket(id, data) {
  const [updatedTicket] = await db('ticket')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    ]);
  return updatedTicket;
}

// Delete a ticket
async function deleteTicket(id) {
  await db('ticket')
    .where({ id })
    .del();
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};