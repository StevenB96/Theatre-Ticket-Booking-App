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
          <th>Title</th>
          <th>Start of Run</th>
          <th>End of Run</th>
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
              {u.title}
            </td>
            <td>
              {u.start_run}
            </td>
            <td>
              {u.end_run}
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