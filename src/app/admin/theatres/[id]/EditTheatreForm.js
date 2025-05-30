'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function EditTheatreForm({ theatre }) {
  const [name, setName] = useState(theatre.name || '');
  const [address, setAddress] = useState(theatre.address || '');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/theatres/${theatre.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address }),
    });

    if (res.ok) {
      router.push('/admin/theatres');
    } else {
      const err = await res.json();
      alert('Error: ' + (err.error || res.statusText));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button type="submit">
          Update
        </button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};

EditTheatreForm.propTypes = {
  theatre: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};
