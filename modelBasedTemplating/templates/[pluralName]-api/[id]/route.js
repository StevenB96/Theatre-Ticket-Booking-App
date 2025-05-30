// templates/idRouteTemplate.js
const idRouteTemplate = `import { NextResponse } from 'next/server';
import {
  get<%= Name %>ById,
  update<%= Name %>,
  delete<%= Name %>
} from '@/lib/db/<%= name %>';

export async function GET(_, { params }) {
  try {
    const { id: <%= name %>Id } = await params;
    const <%= name %> = await get<%= Name %>ById(Number(<%= name %>Id));
    if (!<%= name %>) {
      return NextResponse.json({ error: '<%= Name %> not found' }, { status: 404 });
    }
    return NextResponse.json(<%= name %>);
  } catch (err) {
    console.error('GET <%= name %> error:', err);
    return NextResponse.json({ error: 'Failed to fetch <%= name %>' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
  try {
    const {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
    } = await req.json();

    /* TEMPLATE COMMENT:
      Add relevant attributes.
      E.g.
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
    */

    const { id: <%= name %>Id } = await params;
    const updated = await update<%= Name %>(Number(<%= name %>Id), {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT <%= name %> error:', err);

    return NextResponse.json({ error: 'Failed to update <%= name %>' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: <%= name %>Id } = await params;
    await delete<%= Name %>(Number(<%= name %>Id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE <%= name %> error:', err);
    return NextResponse.json({ error: 'Failed to delete <%= name %>' }, { status: 500 });
  }
};`;

module.exports = idRouteTemplate;
