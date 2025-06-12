// app/admin/shows/actions.ts
'use server';

import { deleteShow } from '@/library/db/show';
import { revalidatePath } from 'next/cache';

export async function deleteShowAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;

  await deleteShow(id);
  revalidatePath('/admin/show'); // Refresh the table view
}
