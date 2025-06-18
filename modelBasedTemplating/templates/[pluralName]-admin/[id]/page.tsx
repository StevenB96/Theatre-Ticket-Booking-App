// templates/editPageTemplate.js
const editPageTemplate = `// app/admin/<%= pluralName %>/[id]/edit/page.tsx

import { get<%= Name %>ById } from '@/library/db/<%= name %>';
import Edit<%= Name %>Form from './Edit<%= Name %>Form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Edit<%= Name %>Page({ params }: PageProps) {
  const { id } = await params;
  const <%= name %> = await get<%= Name %>ById(parseInt(id, 10));

  if (!<%= name %>) {
    return (
      <div>
        <h1><%= Name %> not found</h1>
        <p>No <%= name %> exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit <%= Name %> #{<%= name %>.id}</h1>
      <Edit<%= Name %>Form <%= name %>={<%= name %>} />
    </div>
  );
}
`;

module.exports = editPageTemplate;
