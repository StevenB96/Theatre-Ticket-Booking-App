// templates/createPageTemplate.js
const createPageTemplate = `import dynamic from 'next/dynamic';

const Create<%= Name %>Form = dynamic(
  () => import('./Create<%= Name %>Form'),
  { loading: () => <p>Loading form…</p> }
);

export default function Create<%= Name %>Page() {
  return (
    <div>
      <h1>Create <%= Name %></h1>
      <Create<%= Name %>Form />
    </div>
  );
};`;

module.exports = createPageTemplate;
