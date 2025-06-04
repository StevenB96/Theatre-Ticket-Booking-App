/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 50).notNullable().unique();
    table.string("email", 100).notNullable().unique();
    table.text("password_hash").notNullable();
    table.integer("role").notNullable().defaultTo(1).comment("1 = admin, 0 = user");
    table.integer("status").notNullable().defaultTo(1).comment("1 = active, 0 = inactive");
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
