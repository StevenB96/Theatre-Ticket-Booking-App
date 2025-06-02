import Link from 'next/link';

export default function PerformanceTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes. E.g.    
            <th>ID</th>
          */}
          <th>ID</th>
          <th>Theatre Has Show ID</th>
          <th>Start Time</th>
          <th>Type</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((performance) => (
          <tr key={performance.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes. E.g.    
              <td>
                {performance.id}
              </td>
            */}
            <td>
              {performance.id}
            </td>
            <td>
              {performance.theatre_has_show_id}
            </td>
            <td>
              {new Date(performance.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td>
              {performance.type}
            </td>
            <td>
              {performance.status}
            </td>
            <td>
              {new Date(performance.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(performance.updated_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              <Link href={'/admin/performances/' + performance.id}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(performance.id)}
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