// templates/actionsTemplate.js
const actionsTemplate = `// app/admin/<%= pluralName %>/actions.ts

'use server';

import {
  create<%= Name %>,
  update<%= Name %>ById,
  delete<%= Name %>ById,
} from '@/library/db/<%= name %>';
import type {
  Create<%= Name %>Input,
  Update<%= Name %>Input,
} from '@/types/<%= name %>';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new <%= name %>.
 * - Redirects to the newly created <%= name %>'s page.
 * - Revalidates the "/admin/<%= pluralName %>" path.
 */
export async function create<%= Name %>Action(formData: FormData) {
  /* TEMPLATE COMMENT:
    // Example for a string field:
    const someField = String(formData.get('someField') ?? '');
    if (!someField) throw new Error('SomeField is required');

    // Example for a number field:
    const anotherField = Number(formData.get('anotherField') ?? NaN);
    if (isNaN(anotherField)) throw new Error('AnotherField is required');
  */

  const input: Create<%= Name %>Input = {
    /* TEMPLATE COMMENT:
      someField,
      anotherField,
      // repeat for each input property
    */
  };

  const <%= name %> = await create<%= Name %>(input);
  revalidatePath('/admin/<%= pluralName %>/' + <%= name %>.id);
  redirect('/admin/<%= pluralName %>/' + <%= name %>.id);
}

/**
 * Server action to update an existing <%= name %> by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/<%= pluralName %>" path.
 */
export async function update<%= Name %>ByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID is required');

  /* TEMPLATE COMMENT:
    // Example for a string field:
    const someField = String(formData.get('someField') ?? '');
    if (!someField) throw new Error('SomeField is required');

    // Example for a number field:
    const anotherField = Number(formData.get('anotherField') ?? NaN);
    if (isNaN(anotherField)) throw new Error('AnotherField is required');
  */

  const input: Update<%= Name %>Input = {
    id,
    /* TEMPLATE COMMENT:
      someField,
      anotherField,
      // repeat for each property
    */
  };

  await update<%= Name %>ById(id, input);
  revalidatePath('/admin/<%= pluralName %>');
  redirect('/admin/<%= pluralName %>');
}

/**
 * Server action to delete a <%= name %> by ID.
 * - Revalidates the "/admin/<%= pluralName %>" path after deletion.
 */
export async function delete<%= Name %>ByIdAction(formData: FormData) {
  const id = Number(formData.get('<%= name %>Id'));
  if (!id) return;

  await delete<%= Name %>ById(id);
  revalidatePath('/admin/<%= pluralName %>');
};
`;

module.exports = actionsTemplate;
