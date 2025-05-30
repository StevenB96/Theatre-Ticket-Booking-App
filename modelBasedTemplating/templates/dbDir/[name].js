// templates/dbFunctionsTemplate.js
const dbFunctionsTemplate = `const db = require('../dbClient.js'); // Knex instance

// Get all <%= pluralName %>
async function getAll<%= PluralName %>() {
  return db('<%= name %>')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
    )
    .orderBy('id', 'asc');
}

// Get one <%= name %> by ID
async function get<%= Name %>ById(id) {
  return db('<%= name %>')
    .where({ id })
    .first();
}

// Create a new <%= name %>
async function create<%= Name %>({ name, address }) {
  const [new<%= Name %>] = await db('<%= name %>')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'username','
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
    ]);
  return new<%= Name %>;
}

// Update an existing <%= name %>
async function update<%= Name %>(id, data) {
  const [updated<%= Name %>] = await db('<%= name %>')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id','
      */
    ]);
  return updated<%= Name %>;
}

// Delete a <%= name %>
async function delete<%= Name %>(id) {
  await db('<%= name %>')
    .where({ id })
    .del();
}

module.exports = {
  getAll<%= PluralName %>,
  get<%= Name %>ById,
  create<%= Name %>,
  update<%= Name %>,
  delete<%= Name %>,
};`;

module.exports = dbFunctionsTemplate;