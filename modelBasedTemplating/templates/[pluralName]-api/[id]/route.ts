// templates/idRouteTemplate.js
const idRouteTemplate = `// app/api/<%= pluralName %>/[id]/route.ts
import { NextResponse } from 'next/server';
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
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const <%= name %>IdFromUrl = parseInt(id, 10);
    const <%= name %> = await get<%= Name %>ById(<%= name %>IdFromUrl);

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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: Update<%= Name %>Input = await req.json();
    const { id } = await context.params;
    const <%= name %>IdFromUrl = parseInt(id, 10);

    if (body.id !== <%= name %>IdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: <%= Name %> = await update<%= Name %>(<%= name %>IdFromUrl, body);

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
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const <%= name %>IdFromUrl = parseInt(id, 10);
    await delete<%= Name %>(<%= name %>IdFromUrl);

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
