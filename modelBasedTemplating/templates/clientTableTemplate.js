// templates/clientTableTemplate.js
const clientTableTemplate = `'use client';

import { useRouter } from 'next/navigation';
import <%= Name %>TableServer from './<%= Name %>Table.server';

export default function <%= Name %>Table({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this <%= name %>?')) return;
    await fetch('/api/<%= pluralName %>/' + id, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <<%= Name %>TableServer data={data} onDelete={handleDelete} />;
};`;

module.exports = clientTableTemplate;
