// app/admin/theatres/[id]/edit/EditTheatreForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Theatre } from '@/types/theatre';
import { updateTheatreByIdAction } from '../actions';

interface EditTheatreFormProps {
  theatre: Theatre;
}

export default function EditTheatreForm({ theatre }: EditTheatreFormProps) {
  const router = useRouter();

  const [nameValue, setNameValue] = useState<string>(
    theatre.name.toString()
  );
  const [addressValue, setAddressValue] = useState<string>(
    theatre.address.toString()
  );
  const [statusValue, setStatusValue] = useState<string>(
    theatre.status.toString()
  );

  return (
    <form action={updateTheatreByIdAction}>
      <input type="hidden" name="id" value={theatre.id} />

      <div>
        <label>
          Name:
          <input
            id="name"
            name="name"
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Address:
          <textarea
            id="address"
            name="address"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Status:
          <input
            id="status"
            name="status"
            type="number"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push('/admin/theatres')}>
          Cancel
        </button>
      </div>
    </form>
  );
}

