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
          {data.map((item) => (
            <tr key={item.id}>
              {/* TEMPLATE COMMENT:
                  Map fields from item for display.
                  Example:
                    <td>{item.name}</td>
                    <td>{item.status}</td>
              */}
              <td>
                <Link href={'/admin/<%= pluralName %>/' + item.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="<%= name %>Id"
                  value={item.id}
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