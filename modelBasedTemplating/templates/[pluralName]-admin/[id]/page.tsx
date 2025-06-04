// templates/editPageTemplate.js
const editPageTemplate = `// app/admin/<%= pluralName %>/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { get<%= Name %>ById } from '@/library/db/<%= name %>';

interface Edit<%= Name %>PageProps {
  params: Promise<{ id: string }>;
}

const Edit<%= Name %>Form = dynamic(() => import('./Edit<%= Name %>Form'), {
  loading: () => <p>Loading form…</p>,
});

export default async function Edit<%= Name %>Page({
  params,
}: Edit<%= Name %>PageProps): Promise<ReactNode> {
  const { id } = await params;
  const <%= name %>IdFromUrl = parseInt(id, 10);
  const <%= name %> = await get<%= Name %>ById(<%= name %>IdFromUrl);

  if (!<%= name %>) {
    return (
      <div>
        <h1><%= Name %> not found</h1>
        <p>No <%= name %> exists with ID #{<%= name %>Id}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit <%= Name %> #{<%= name %>.id}</h1>
      <Edit<%= Name %>Form <%= name %>={<%= name %>} />
    </div>
  );
};`;

module.exports = editPageTemplate;
