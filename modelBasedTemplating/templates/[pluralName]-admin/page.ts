// templates/listPageTemplate.js
const listPageTemplate = `// app/admin/<%= pluralName %>/page.tsx
// import Link from 'next/link';
import <%= Name %>Table from './<%= Name %>Table.client';
import { getAll<%= PluralName %> } from '@/library/db/<%= name %>';

export default async function <%= PluralName %>Page() {
  const <%= pluralName %> = await getAll<%= PluralName %>();

  return (
    <div>
      <h1><%= PluralName %></h1>
      <p>
        <Link href="/admin/<%= pluralName %>/create">+ New <%= Name %></Link>
      </p>
      <<%= Name %>Table data={<%= pluralName %>} />
    </div>
  );
};`;

module.exports = listPageTemplate;
