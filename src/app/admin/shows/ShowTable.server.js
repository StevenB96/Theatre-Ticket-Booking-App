import Link from 'next/link';

export default function ShowTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes. E.g.    
            <th>ID</th>
          */}
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
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
              {u.id}
            </td>
            <td>
              {u.name}
            </td>
            <td>
              {u.status}
            </td>
            <td>
              {new Date(u.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(u.updated_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              <Link href={'/admin/shows/' + u.id}>Edit</Link>
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
};