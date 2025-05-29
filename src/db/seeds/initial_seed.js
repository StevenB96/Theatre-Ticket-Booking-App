const bcryptjs = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function (knex) {
  // Clear tables
  await knex('ticket').del();
  await knex('performance').del();
  await knex('show').del();
  await knex('seat').del();
  await knex('user').del();
  await knex('theatre').del();

  // Insert theatres
  const [theatre1Id] = await knex('theatre').insert({
    name: 'Grand Theatre',
    address: '123 Main St',
  }).returning('id');

  // Hash user password before inserting
  const passwordPlain = 'password123';
  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(passwordPlain, saltRounds);

  // Insert users
  const [user1Id] = await knex('user').insert({
    username: 'john_doe',
    email: 'john@example.com',
    password_hash: passwordHash,
  }).returning('id');

  // Insert seats
  const [seat1Id] = await knex('seat').insert({
    theatre_id: theatre1Id.id,
    code: 'A1',
    zone: 'Orchestra',
  }).returning('id');

  // Insert shows
  const [show1Id] = await knex('show').insert({
    title: 'The Great Show',
    start_run: '2025-06-01',
    end_run: '2025-06-30',
  }).returning('id');

  // Insert performance
  const [performance1Id] = await knex('performance').insert({
    show_id: show1Id.id,
    type: 'Matinee',
    start_time: '2025-06-05 14:00:00',
    end_time: '2025-06-05 16:00:00',
  }).returning('id');

  // Insert ticket
  await knex('ticket').insert({
    user_id: user1Id.id,
    seat_id: seat1Id.id,
    performance_id: performance1Id.id,
    price: 50.00,
  });
}
