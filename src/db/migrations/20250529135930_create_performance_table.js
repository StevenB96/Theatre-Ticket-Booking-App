/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('performance', (table) => {
    table.increments('id')
      .primary();
    table.integer('show_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('show')
      .onDelete('CASCADE');
    table.string('type', 50).nullable();
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('performance');
}
