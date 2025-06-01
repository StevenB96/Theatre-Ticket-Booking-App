/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('theatre', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.text('address').nullable();
    table.integer('status')
      .defaultTo(1)
      .comment('1 = active, 0 = inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('show', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.integer('status')
      .defaultTo(1)
      .comment('1 = active, 0 = inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('theatre_has_show', (table) => {
    table.increments('id').primary();
    table.integer('theatre_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('theatre')
      .onDelete('CASCADE');
    table.integer('show_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('show')
      .onDelete('CASCADE');
    table.date('start_run').nullable();
    table.date('end_run').nullable();
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
  await knex.schema.dropTableIfExists('theatre');
  await knex.schema.dropTableIfExists('show');
  await knex.schema.dropTableIfExists('theatre_has_show');
};