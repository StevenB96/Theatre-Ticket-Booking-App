// templates/serverTableTemplate.js
const serverTableTemplate = `import Link from 'next/link';

export default function <%= Name %>TableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes. E.g.    
            <th>ID</th>
          */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((<%= name %>) => (
          <tr key={<%= name %>.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes. E.g.    
              <td>
                {<%= name %>.id}
              </td>
            */}
            <td>
              <Link href={'/admin/<%= pluralName %>/' + <%= name %>.id}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(<%= name %>.id)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};`;

module.exports = serverTableTemplate;
