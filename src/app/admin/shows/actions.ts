// app/admin/shows/actions.ts
'use server';

import { deleteShowById } from '@/library/db/show';
import { revalidatePath } from 'next/cache';

export async function deleteShowByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) return;

  await deleteShowById(id);
  revalidatePath('/admin/show');
}
