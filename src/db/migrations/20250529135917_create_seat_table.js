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
    table.string('code', 10).notNullable();
    table.string('zone', 50).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.unique(['theatre_id', 'code']);
  });
}

/**
 * @param { import("knex").Knex } knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('seat');
}
