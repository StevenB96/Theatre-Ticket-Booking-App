const { hashPassword } = require('../../library/auth');

// Determine current environment
const isProduction = process.env.NODE_ENV === 'production';

/**
 * @param {import('knex').Knex} knex
 */
async function seed(knex) {
  // 1) Clear tables
  // Disable foreign key checks based on environment
  if (isProduction) {
    // MySQL: disable foreign key checks
    await knex.raw('SET FOREIGN_KEY_CHECKS=0');
  } else {
    // SQLite: disable foreign keys
    await knex.raw('PRAGMA foreign_keys = OFF');
  }
  // Clear tables in order, from dependent (child) to parent
  await knex('ticket').truncate();
  await knex('performance').truncate();
  await knex('seat').truncate();
  await knex('user').truncate();
  await knex('show').truncate();
  await knex('theatre').truncate();
  // Re-enable foreign key checks
  if (isProduction) {
    await knex.raw('SET FOREIGN_KEY_CHECKS=1');
  } else {
    await knex.raw('PRAGMA foreign_keys = ON');
  }

  // 2) Users
  const [adminH, johnH, janeH] = await Promise.all([
    hashPassword('admin'),
    hashPassword('john'),
    hashPassword('jane'),
  ]);
  await knex('user').insert([
    { id: 1, username: 'admin', email: 'admin@example.com', password_hash: adminH, role: 1, status: 1 },
    { id: 2, username: 'johndoe', email: 'john@example.com', password_hash: johnH, role: 0, status: 1 },
    { id: 3, username: 'janedoe', email: 'jane@example.com', password_hash: janeH, role: 0, status: 1 },
  ]);

  // 3) Theatres + their seat‑zone profiles
  const theatres = [
    { id: 1, name: 'Grand Theatre', address: '123 Main St, London', status: 1, totalSeats: 18, zones: ['Stalls', 'Dress Circle', 'Royal Box'] },
    { id: 2, name: 'City Playhouse', address: '456 Elm St, Manchester', status: 1, totalSeats: 12, zones: ['Stalls', 'Upper Circle', 'Balcony'] },
    { id: 3, name: 'Open Air Stage', address: '789 Park Ave, Oxford', status: 1, totalSeats: 8, zones: ['Stalls', 'General'] },
  ];
  await knex('theatre').insert(theatres.map(t => ({
    id: t.id, name: t.name, address: t.address, status: t.status
  })));

  // 4) Shows
  await knex('show').insert([
    { id: 1, name: 'Hamlet', status: 1 },
    { id: 2, name: 'The Phantom of the Opera', status: 1 },
    { id: 3, name: 'Les Misérables', status: 1 },
    { id: 4, name: 'A Midsummer Night’s Dream', status: 1 },
  ]);

  // 5) Allocate seats per theatre
  function allocateSeats(totalSeats, zones) {
    const stallsCount = Math.ceil(totalSeats * 0.4);
    const remaining = totalSeats - stallsCount;
    const others = zones.filter(z => z !== 'Stalls');
    const perOther = others.length ? Math.floor(remaining / others.length) : 0;
    return zones.map(zone => ({
      zone,
      count: zone === 'Stalls' ? stallsCount : perOther
    }));
  }

  const seatRecords = [];
  let sid = 1;
  for (const t of theatres) {
    const layout = allocateSeats(t.totalSeats, t.zones);
    for (const { zone, count } of layout) {
      const prefix = zone[0].toUpperCase();
      for (let i = 1; i <= count; i++) {
        seatRecords.push({
          id: sid++,
          theatre_id: t.id,
          code: `${prefix}${i}`,
          zone,
          status: 1
        });
      }
    }
  }
  await knex('seat').insert(seatRecords);

  // 6) Performances with a sellRate param
  const performances = [
    { id: 1, theatre_id: 1, show_id: 1, start_time: '2025-06-05T19:00:00', type: 1, status: 1, sellRate: 1.0 },
    { id: 2, theatre_id: 1, show_id: 1, start_time: '2025-06-06T14:00:00', type: 0, status: 1, sellRate: 0.5 },
    { id: 3, theatre_id: 2, show_id: 2, start_time: '2025-07-10T19:00:00', type: 1, status: 1, sellRate: 0.2 },
    { id: 4, theatre_id: 2, show_id: 3, start_time: '2025-08-15T20:00:00', type: 1, status: 1, sellRate: 0.6 },
    { id: 5, theatre_id: 3, show_id: 4, start_time: '2025-09-10T18:30:00', type: 1, status: 1, sellRate: 0.8 },
    { id: 6, theatre_id: 3, show_id: 2, start_time: '2025-06-20T17:00:00', type: 0, status: 1, sellRate: 0.3 },
  ];
  await knex('performance').insert(performances.map(({ sellRate, ...p }) => p));

  // 7) Generate tickets: one per seat, some sold (user_id), some unsold
  const tickets = [];
  let tid = 1;
  const users = [2, 3];

  for (const perf of performances) {
    const seats = seatRecords.filter(s => s.theatre_id === perf.theatre_id);
    const soldCount = Math.round(seats.length * perf.sellRate);

    seats.forEach((seat, idx) => {
      const sold = idx < soldCount;
      tickets.push({
        id: tid++,
        user_id: sold ? users[idx % users.length] : null,
        seat_id: seat.id,
        performance_id: perf.id,
        price:
          seat.zone === 'Royal Box' ? 120 :
            seat.zone === 'Dress Circle' ? 75 :
              seat.zone === 'Upper Circle' ? 65 :
                seat.zone === 'Balcony' ? 55 :
                  45,
        status: 1
      });
    });
  }

  await knex('ticket').insert(tickets);
}

module.exports = { seed };
