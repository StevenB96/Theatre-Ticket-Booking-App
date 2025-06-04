const { hashPassword } = require('../../library/auth');

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  // Clear tables in correct order to satisfy foreign key constraints
  await knex('ticket').truncate();
  await knex('performance').truncate();
  await knex('seat').truncate();
  await knex('theatre_has_show').truncate();
  await knex('show').truncate();
  await knex('theatre').truncate();
  await knex('user').truncate();

  // Hash passwords
  const adminHashed = await hashPassword('admin');
  const johndoeHashed = await hashPassword('john');

  // Insert users
  await knex('user').insert([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password_hash: adminHashed,
      role: 1,
      status: 1,
    },
    {
      id: 2,
      username: 'johndoe',
      email: 'john@example.com',
      password_hash: johndoeHashed,
      role: 0,
      status: 1,
    },
  ]);

  // Insert theatres
  await knex('theatre').insert([
    {
      id: 1,
      name: 'Grand Theatre',
      address: '123 Main St, London',
      status: 1,
    },
    {
      id: 2,
      name: 'City Playhouse',
      address: '456 Elm St, Manchester',
      status: 1,
    },
  ]);

  // Insert shows
  await knex('show').insert([
    {
      id: 1,
      name: 'Hamlet',
      status: 1,
    },
    {
      id: 2,
      name: 'The Phantom of the Opera',
      status: 1,
    },
  ]);

  // Insert theatre-show relations
  await knex('theatre_has_show').insert([
    {
      id: 1,
      theatre_id: 1,
      show_id: 1,
      start_run: '2025-06-01',
      end_run: '2025-06-30',
      status: 1,
    },
    {
      id: 2,
      theatre_id: 1,
      show_id: 2,
      start_run: '2025-07-01',
      end_run: '2025-07-31',
      status: 1,
    },
    {
      id: 3,
      theatre_id: 2,
      show_id: 2,
      start_run: '2025-08-01',
      end_run: '2025-08-31',
      status: 1,
    },
  ]);

  // Insert seats
  await knex('seat').insert([
    {
      id: 1,
      theatre_id: 1,
      code: 'A1',
      zone: 'Orchestra',
      status: 1,
    },
    {
      id: 2,
      theatre_id: 1,
      code: 'A2',
      zone: 'Orchestra',
      status: 1,
    },
    {
      id: 3,
      theatre_id: 2,
      code: 'B1',
      zone: 'Balcony',
      status: 1,
    },
  ]);

  // Insert performances
  await knex('performance').insert([
    {
      id: 1,
      theatre_has_show_id: 1,
      start_time: '2025-06-05T19:00:00',
      type: 1,
      status: 1,
    },
    {
      id: 2,
      theatre_has_show_id: 1,
      start_time: '2025-06-06T14:00:00',
      type: 0,
      status: 1,
    },
    {
      id: 3,
      theatre_has_show_id: 2,
      start_time: '2025-07-10T19:00:00',
      type: 1,
      status: 1,
    },
  ]);

  // Insert tickets
  await knex('ticket').insert([
    {
      id: 1,
      user_id: 2,
      seat_id: 1,
      performance_id: 1,
      price: 50.0,
      status: 1,
    },
    {
      id: 2,
      user_id: 2,
      seat_id: 2,
      performance_id: 2,
      price: 45.0,
      status: 1,
    },
  ]);
}

module.exports = { seed };
