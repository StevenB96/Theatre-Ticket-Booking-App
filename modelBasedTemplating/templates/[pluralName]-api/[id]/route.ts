// templates/idRouteTemplate.js
const idRouteTemplate = `import { NextResponse } from 'next/server';
import {
  get<%= Name %>ById,
  update<%= Name %>,
  delete<%= Name %>,
} from '@/library/db/<%= name %>';
import {
  <%= Name %>,
  Update<%= Name %>Input
} from '@/types/<%= name %>';

// GET /api/<%= pluralName %>/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const <%= name %>Id = Number(params.id);
    const <%= name %> = await get<%= Name %>ById(<%= name %>Id);

    if (!<%= name %>) {
      return NextResponse.json(
        { error: '<%= Name %> not found' },
        { status: 404 }
      );
    }

    if (!<%= name %>) {
      return NextResponse.json(
        { error: '<%= Name %> not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(<%= name %>);
  } catch (err) {
    console.error('GET <%= name %> error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch <%= name %>' },
      { status: 500 }
    );
  }
}

// PUT /api/<%= pluralName %>/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: Update<%= Name %>Input = await req.json();

    const <%= name %>IdFromUrl = Number(params.id);
    if (body.id !== <%= name %>IdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: <%= Name %> = await update<%= Name %>(<%= name %>IdFromUrl, {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. id: body.id,
      */
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT <%= name %> error:', err);
    return NextResponse.json(
      { error: 'Failed to update <%= name %>' },
      { status: 500 }
    );
  }
}

// DELETE /api/<%= pluralName %>/:id
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const <%= name %>Id = Number(params.id);
    await delete<%= Name %>(<%= name %>Id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE <%= name %> error:', err);
    return NextResponse.json(
      { error: 'Failed to delete <%= name %>' },
      { status: 500 }
    );
  }
};`;

module.exports = idRouteTemplate;
