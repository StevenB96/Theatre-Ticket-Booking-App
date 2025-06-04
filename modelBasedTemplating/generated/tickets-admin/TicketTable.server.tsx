// app/admin/tickets/TicketTable.server.tsx
import Link from 'next/link';
import type { Ticket } from '@/types/ticket';

interface TicketTableServerProps {
  data: Ticket[];
  onDelete?: (id: number) => void;
};

export default function TicketTableServer({
  data,
  onDelete,
}: TicketTableServerProps) {
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
        {data.map((ticket) => (
          <tr key={ticket.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes.
              E.g. <td>{ticket.id}</td>
            */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};