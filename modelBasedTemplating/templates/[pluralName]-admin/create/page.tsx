// templates/createPageTemplate.js
const createPageTemplate = `// app/admin/<%= pluralName %>/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const Create<%= Name %>Form = dynamic(
  () => import('./Create<%= Name %>Form'),
  { loading: () => <p>Loading form…</p> }
);

export default function Create<%= Name %>Page(): ReactNode {
  return (
    <div>
      <h1>Create <%= Name %></h1>
      <Create<%= Name %>Form />
    </div>
  );
};`;

module.exports = createPageTemplate;
