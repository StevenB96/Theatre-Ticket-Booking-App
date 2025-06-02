import Link from 'next/link';

export default function TicketTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {/* TEMPLATE COMMENT:
            Add relevant attributes. E.g.    
            <th>ID</th>
          */}
          <th>ID</th>
          <th>User ID</th>
          <th>Seat ID</th>
          <th>Performance ID</th>
          <th>Price</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ticket) => (
          <tr key={ticket.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes. E.g.    
              <td>
                {u.id}
              </td>
            */}
            <td>
              {ticket.id}
            </td>
            <td>
              {ticket.user_id}
            </td>
            <td>
              {ticket.seat_id}
            </td>
            <td>
              {ticket.performance_id}
            </td>
            <td>
              {ticket.price}
            </td>
            <td>
              {ticket.status}
            </td>
            <td>
              {new Date(ticket.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(ticket.updated_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              <Link href={'/admin/tickets/' + ticket.id}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(ticket.id)}
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