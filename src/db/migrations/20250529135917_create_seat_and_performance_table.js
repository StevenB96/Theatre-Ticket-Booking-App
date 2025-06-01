/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('seat', (table) => {
    table.increments('id').primary();
    table.integer('theatre_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('theatre')
      .onDelete('CASCADE');
    table.string('code', 10).notNullable().unique();
    table.string('zone', 10).nullable();
    table.integer('status')
      .defaultTo(1)
      .comment('1 = active, 0 = inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('performance', (table) => {
    table.increments('id')
      .primary();
    table.integer('theatre_has_show_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('theatre_has_show')
      .onDelete('CASCADE');
    table.timestamp('start_time').notNullable();
    table.integer('type')
      .defaultTo(1)
      .comment('1 = evening, 0 = matinee');
    table.integer('status')
      .defaultTo(1)
      .comment('1 = active, 0 = inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('ticket', (table) => {
    table.increments('id').primary();
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('seat_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('seat')
      .onDelete('CASCADE');
    table.integer('performance_id')
      .unsigned().notNullable()
      .references('id')
      .inTable('performance')
      .onDelete('CASCADE');
    table.decimal('price', 10, 2).notNullable();
    table.integer('status')
      .defaultTo(1)
      .comment('1 = active, 0 = inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('seat');
  await knex.schema.dropTableIfExists('performance');
  await knex.schema.dropTableIfExists('ticket');
};
