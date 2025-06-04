/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable("theatre", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.text("address").nullable();
    table.integer("status").notNullable().defaultTo(1).comment("1 = active, 0 = inactive");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("show", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.integer("status").notNullable().defaultTo(1).comment("1 = active, 0 = inactive");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("theatre_has_show", (table) => {
    table.increments("id").primary();
    table.integer("theatre_id").unsigned().notNullable().references("id").inTable("theatre").onDelete("CASCADE");
    table.integer("show_id").unsigned().notNullable().references("id").inTable("show").onDelete("CASCADE");
    table.date("start_run").nullable();
    table.date("end_run").nullable();
    table.integer("status").notNullable().defaultTo(1).comment("1 = active, 0 = inactive");
    table.timestamps(true, true);
    table.unique(["theatre_id", "show_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("theatre_has_show");
  await knex.schema.dropTableIfExists("show");
  await knex.schema.dropTableIfExists("theatre");
};
