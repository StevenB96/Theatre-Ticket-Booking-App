/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('username', 50).notNullable().unique();
    table.string('email', 100).notNullable().unique();
    table.text('password_hash').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('user');
}
