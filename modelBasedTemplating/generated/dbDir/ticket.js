const db = require('../dbClient.js'); // Knex instance

// Get all tickets
async function getAllTickets() {
  return db('ticket')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
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
async function createTicket({ name, address }) {
  const [newTicket] = await db('ticket')
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