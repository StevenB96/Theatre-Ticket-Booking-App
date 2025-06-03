// templates/clientTableTemplate.js
const clientTableTemplate = `// app/admin/<%= pluralName %>/<%= Name %>Table.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { <%= Name %> } from '@/types/<%= name %>';
import <%= Name %>TableServer from './<%= Name %>Table.server';

interface <%= Name %>TableProps {
  data: <%= Name %>[];
};

export default function <%= Name %>Table({ data }: <%= Name %>TableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this <%= name %>?')) return;
    await fetch('/api/<%= pluralName %>/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <<%= Name %>TableServer data={data} onDelete={handleDelete} />;
};`;

module.exports = clientTableTemplate;
