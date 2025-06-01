// templates/editPageTemplate.js
const editPageTemplate = `import dynamic from 'next/dynamic';
import { get<%= Name %>ById } from '@/library/db/<%= name %>';

const Edit<%= Name %>Form = dynamic(
  () => import('./Edit<%= Name %>Form'),
  { loading: () => <p>Loading form…</p> }
);

export default async function Edit<%= Name %>Page({ params }) {
  const { id: <%= name %>Id } = await params;
  const <%= name %> = await get<%= Name %>ById(<%= name %>Id)

  return (
    <div>
      <h1>Edit <%= Name %> #{<%= name %>.id}</h1>
      <Edit<%= Name %>Form <%= name %>={<%= name %>} />
    </div>
  );
};`;

module.exports = editPageTemplate;
