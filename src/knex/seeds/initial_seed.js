const { hashPassword } = require('../../library/auth');

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
async function seed(knex) {
  // Clear tables in correct order
  await knex('ticket').truncate();
  await knex('performance').truncate();
  await knex('seat').truncate();
  await knex('theatre_has_show').truncate();
  await knex('show').truncate();
  await knex('theatre').truncate();
  await knex('user').truncate();

  // Hash passwords
  const [adminHashed, johndoeHashed, janedoeHashed] = await Promise.all([
    hashPassword('admin'),
    hashPassword('john'),
    hashPassword('jane'),
  ]);

  // Insert users…
  await knex('user').insert([
    { id: 1, username: 'admin', email: 'admin@example.com', password_hash: adminHashed, role: 1, status: 1 },
    { id: 2, username: 'johndoe', email: 'john@example.com', password_hash: johndoeHashed, role: 0, status: 1 },
    { id: 3, username: 'janedoe', email: 'jane@example.com', password_hash: janedoeHashed, role: 0, status: 1 },
  ]);

  // Insert theatres…
  await knex('theatre').insert([
    { id: 1, name: 'Grand Theatre', address: '123 Main St, London', status: 1 },
    { id: 2, name: 'City Playhouse', address: '456 Elm St, Manchester', status: 1 },
    { id: 3, name: 'Open Air Stage', address: '789 Park Ave, Oxford', status: 1 },
  ]);

  // Insert shows…
  await knex('show').insert([
    { id: 1, name: 'Hamlet', status: 1 },
    { id: 2, name: 'The Phantom of the Opera', status: 1 },
    { id: 3, name: 'Les Misérables', status: 1 },
    { id: 4, name: 'A Midsummer Night’s Dream', status: 1 },
  ]);

  // Insert theatre-show…
  await knex('theatre_has_show').insert([
    { id: 1, theatre_id: 1, show_id: 1, start_run: '2025-06-01', end_run: '2025-06-30', status: 1 },
    { id: 2, theatre_id: 1, show_id: 2, start_run: '2025-07-01', end_run: '2025-07-31', status: 1 },
    { id: 3, theatre_id: 2, show_id: 2, start_run: '2025-08-01', end_run: '2025-08-31', status: 1 },
    { id: 4, theatre_id: 2, show_id: 3, start_run: '2025-09-05', end_run: '2025-10-05', status: 1 },
    { id: 5, theatre_id: 3, show_id: 4, start_run: '2025-06-15', end_run: '2025-07-15', status: 1 },
  ]);

  // Define zones with seat counts
  const zoneLayouts = [
    { theatre: 1, zone: 'Stalls', count: 5 },
    { theatre: 1, zone: 'Dress Circle', count: 3 },
    { theatre: 2, zone: 'Upper Circle', count: 4 },
    { theatre: 2, zone: 'Balcony', count: 3 },
    { theatre: 3, zone: 'General', count: 6 },
  ];

  // Build seats: code = <zone-initial><sequence>
  const seatRecords = [];
  let seatId = 1;
  for (const { theatre, zone, count } of zoneLayouts) {
    const initial = zone[0].toUpperCase();   // S, D, U, B, G
    for (let i = 1; i <= count; i++) {
      seatRecords.push({
        id: seatId++,
        theatre_id: theatre,
        code: `${initial}${i}`,            // e.g. “S1”, “D2”, “U3”, etc.
        zone,
        status: 1,
      });
    }
  }

  // Sanity‐check: no duplicate seat codes
  const codes = seatRecords.map(s => s.code);
  const dupes = codes.filter((c, idx) => codes.indexOf(c) !== idx);
  if (dupes.length) {
    throw new Error(`Duplicate seat codes in seed: ${[...new Set(dupes)].join(', ')}`);
  }

  await knex('seat').insert(seatRecords);

  // Insert performances…
  await knex('performance').insert([
    { id: 1, theatre_has_show_id: 1, start_time: '2025-06-05T19:00:00', type: 1, status: 1 },
    { id: 2, theatre_has_show_id: 1, start_time: '2025-06-06T14:00:00', type: 0, status: 1 },
    { id: 3, theatre_has_show_id: 2, start_time: '2025-07-10T19:00:00', type: 1, status: 1 },
    { id: 4, theatre_has_show_id: 3, start_time: '2025-08-15T20:00:00', type: 1, status: 1 },
    { id: 5, theatre_has_show_id: 4, start_time: '2025-09-10T18:30:00', type: 1, status: 1 },
    { id: 6, theatre_has_show_id: 5, start_time: '2025-06-20T17:00:00', type: 0, status: 1 },
  ]);

  // Insert tickets…
  await knex('ticket').insert([
    { id: 1, user_id: 2, seat_id: 1, performance_id: 1, price: 50.0, status: 1 },
    { id: 2, user_id: 2, seat_id: 2, performance_id: 2, price: 45.0, status: 1 },
    { id: 3, user_id: 3, seat_id: 6, performance_id: 3, price: 60.0, status: 1 },
    { id: 4, user_id: 3, seat_id: 7, performance_id: 4, price: 55.0, status: 1 },
    { id: 5, user_id: 2, seat_id: 12, performance_id: 5, price: 70.0, status: 1 },
    { id: 6, user_id: 3, seat_id: 14, performance_id: 6, price: 40.0, status: 1 },
    { id: 7, user_id: 2, seat_id: 3, performance_id: 1, price: 50.0, status: 1 },
    { id: 8, user_id: 3, seat_id: 10, performance_id: 2, price: 45.0, status: 1 },
    { id: 9, user_id: 2, seat_id: 9, performance_id: 3, price: 60.0, status: 1 },
    { id: 10, user_id: 3, seat_id: 15, performance_id: 5, price: 70.0, status: 1 },
  ]);
}

module.exports = { seed };
