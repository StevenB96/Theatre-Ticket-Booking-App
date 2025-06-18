// templates/listPageTemplate.js
const listPageTemplate = `// app/admin/<%= pluralName %>/page.tsx
import Link from 'next/link';
import <%= Name %>Table from './<%= Name %>Table';
import { getAll<%= Name %>s } from '@/library/db/<%= name %>';

export default async function <%= Name %>sPage() {
  const <%= pluralName %> = await getAll<%= Name %>s();

  return (
    <div>
      <h1><%= Name %>s</h1>
      <p>
        <Link href="/admin/<%= pluralName %>/create">+ New <%= Name %></Link>
      </p>
      <<%= Name %>Table data={<%= pluralName %>} />
    </div>
  );
};
`;

module.exports = listPageTemplate;