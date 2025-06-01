/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function (knex) {
  // Delete existing entries in the correct order to satisfy foreign key constraints
  await knex('ticket').del();
  await knex('performance').del();
  await knex('seat').del();
  await knex('theatre_has_show').del();
  await knex('show').del();
  await knex('theatre').del();
  await knex('user').del();

  // Insert users
  await knex('user').insert([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password_hash: 'hash_admin',
      role: 1,     // 1 = admin
      status: 1,   // 1 = active
    },
    {
      id: 2,
      username: 'johndoe',
      email: 'john@example.com',
      password_hash: 'hash_john',
      role: 0,     // 0 = user
      status: 1,   // 1 = active
    },
  ]);

  // Insert theatres
  await knex('theatre').insert([
    {
      id: 1,
      name: 'Grand Theatre',
      address: '123 Main St, London',
      status: 1,   // 1 = active
    },
    {
      id: 2,
      name: 'City Playhouse',
      address: '456 Elm St, Manchester',
      status: 1,   // 1 = active
    },
  ]);

  // Insert shows
  await knex('show').insert([
    {
      id: 1,
      name: 'Hamlet',
      status: 1,   // 1 = active
    },
    {
      id: 2,
      name: 'The Phantom of the Opera',
      status: 1,   // 1 = active
    },
  ]);

  // Insert theatre_has_show relationships (with run dates)
  await knex('theatre_has_show').insert([
    {
      id: 1,
      theatre_id: 1,
      show_id: 1,
      start_run: '2025-06-01',
      end_run: '2025-06-30',
      status: 1,   // 1 = active
    },
    {
      id: 2,
      theatre_id: 1,
      show_id: 2,
      start_run: '2025-07-01',
      end_run: '2025-07-31',
      status: 1,   // 1 = active
    },
    {
      id: 3,
      theatre_id: 2,
      show_id: 2,
      start_run: '2025-08-01',
      end_run: '2025-08-31',
      status: 1,   // 1 = active
    },
  ]);

  // Insert seats
  await knex('seat').insert([
    {
      id: 1,
      theatre_id: 1,
      code: 'A1',
      zone: 'Orchestra',
      status: 1,   // 1 = active
    },
    {
      id: 2,
      theatre_id: 1,
      code: 'A2',
      zone: 'Orchestra',
      status: 1,   // 1 = active
    },
    {
      id: 3,
      theatre_id: 2,
      code: 'B1',
      zone: 'Balcony',
      status: 1,   // 1 = active
    },
  ]);

  // Insert performances
  await knex('performance').insert([
    {
      id: 1,
      theatre_has_show_id: 1,
      start_time: '2025-06-05 19:00:00',
      type: 1,    // 1 = evening
      status: 1,   // 1 = active
    },
    {
      id: 2,
      theatre_has_show_id: 1,
      start_time: '2025-06-06 14:00:00',
      type: 0,    // 0 = matinee
      status: 1,   // 1 = active
    },
    {
      id: 3,
      theatre_has_show_id: 2,
      start_time: '2025-07-10 19:00:00',
      type: 1,    // 1 = evening
      status: 1,   // 1 = active
    },
  ]);

  // Insert tickets
  await knex('ticket').insert([
    {
      id: 1,
      user_id: 2,         // johndoe
      seat_id: 1,         // A1 in Grand Theatre
      performance_id: 1,  // evening of Hamlet
      price: 50.00,
      status: 1,   // 1 = active
    },
    {
      id: 2,
      user_id: 2,         // johndoe
      seat_id: 2,         // A2 in Grand Theatre
      performance_id: 2,  // matinee of Hamlet
      price: 45.00,
      status: 1,   // 1 = active
    },
  ]);
};

