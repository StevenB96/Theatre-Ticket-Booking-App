// templates/serverTableTemplate.js
const serverTableTemplate = `// app/admin/<%= pluralName %>/<%= Name %>Table.server.tsx
import Link from 'next/link';
import type { <%= Name %> } from '@/types/<%= name %>';

interface <%= Name %>TableServerProps {
  data: <%= Name %>[];
  onDelete?: (id: number) => void;
};

export default function <%= Name %>TableServer({
  data,
  onDelete,
}: <%= Name %>TableServerProps) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes.
            E.g. <th>ID</th>
          */}
        </tr>
      </thead>
      <tbody>
        {data.map((<%= name %>) => (
          <tr key={<%= name %>.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes.
              E.g. <td>{<%= name %>.id}</td>
            */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};`;

module.exports = serverTableTemplate;
