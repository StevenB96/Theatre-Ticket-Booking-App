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
        {data.map((u) => (
          <tr key={u.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes. E.g.    
              <td>
                {u.id}
              </td>
            */}
            <td>
              <Link href={'/admin/<%= pluralName %>/' + u.id}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(u.id)}
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
