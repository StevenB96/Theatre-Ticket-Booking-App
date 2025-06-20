// templates/tableTemplate.js
const tableTemplate = `// app/admin/<%= pluralName %>/<%= Name %>Table.tsx

'use client';

import Link from 'next/link';
import type { <%= Name %> } from '@/types/<%= name %>';
import { delete<%= Name %>ByIdAction } from './actions';

interface Props {
  data: <%= Name %>[];
}

export default function <%= Name %>Table({ data }: Props) {
  return (
    <form action={delete<%= Name %>ByIdAction}>
      <table>
        <thead>
          <tr>
            {/* TEMPLATE COMMENT:
                Define your table headers.
                Example:
                  <th>Name</th>
                  <th>Status</th>
            */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((<%= name %>) => (
            <tr key={<%= name %>.id}>
              {/* TEMPLATE COMMENT:
                  Map fields from <%= name %> for display.
                  Example:
                    <td>{<%= name %>.name}</td>
                    <td>{<%= name %>.status}</td>
              */}
              <td>
                <Link href={'/admin/<%= pluralName %>/' + <%= name %>.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="<%= name %>Id"
                  value={<%= name %>.id}
                  onClick={(e) => {
                    if (!confirm('Delete this <%= name %>?')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
`;

module.exports = tableTemplate;