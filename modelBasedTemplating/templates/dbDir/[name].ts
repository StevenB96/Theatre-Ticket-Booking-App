// templates/dbFunctionsTemplate.js
const dbFunctionsTemplate = `// src/library/db/<%= name %>.ts
import db from '../dbClient';
import type {
  <%= Name %>,
  Create<%= Name %>Input,
  Update<%= Name %>Input,
} from '@/types/<%= name %>';

// Get all <%= pluralName %>
export async function getAll<%= PluralName %>(): Promise<<%= Name %>[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<<%= Name %>>('<%= name %>')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    )
    .orderBy('id', 'asc');
}

// Get one <%= name %> by ID
export async function get<%= Name %>ById(
  id: number
): Promise<<%= Name %> | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<<%= Name %>>('<%= name %>').where({ id }).first();
}

// Create a new <%= name %>
export async function create<%= Name %>(
  input: Create<%= Name %>Input
): Promise<<%= Name %>> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [new<%= Name %>] = await db<<%= Name %>>('<%= name %>')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. status: input.status,
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return new<%= Name %>;
}

// Update an existing <%= name %>
export async function update<%= Name %>(
  id: number,
  data: Update<%= Name %>Input
): Promise<<%= Name %>> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updated<%= Name %>] = await db<<%= Name %>>('<%= name %>')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return updated<%= Name %>;
}

// Delete an existing <%= name %>
export async function delete<%= Name %>(id: number): Promise<void> {
  await db('<%= name %>').where({ id }).del();
}`;

module.exports = dbFunctionsTemplate;