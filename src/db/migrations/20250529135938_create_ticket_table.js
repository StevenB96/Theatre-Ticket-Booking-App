/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
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
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('ticket');
}
