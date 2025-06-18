// templates/createPageTemplate.js
const createPageTemplate = `// app/admin/<%= pluralName %>/create/page.tsx

import React from 'react';
import Create<%= Name %>Form from './Create<%= Name %>Form';

export default function Create<%= Name %>Page() {
  return (
    <div>
      <h1>Create <%= Name %></h1>
      <Create<%= Name %>Form />
    </div>
  );
}
`;

module.exports = createPageTemplate;
