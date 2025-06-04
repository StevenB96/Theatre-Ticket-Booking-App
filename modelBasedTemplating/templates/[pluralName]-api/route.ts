// templates/route.js
const route = `// app/api/<%= pluralName %>/route.ts
import { NextResponse } from 'next/server';
import {
  getAll<%= PluralName %>,
  create<%= Name %>,
} from '@/library/db/<%= name %>';
import {
  <%= Name %>,
  Create<%= Name %>Input,
} from '@/types/<%= name %>';

// GET /api/<%= pluralName %>
export async function GET() {
  try {
    const <%= pluralName %>: <%= Name %>[] = await getAll<%= PluralName %>();
    return NextResponse.json(<%= pluralName %>);
  } catch (err) {
    console.error('GET <%= pluralName %> error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch <%= pluralName %>' },
      { status: 500 }
    );
  }
}

// POST /api/<%= pluralName %>
export async function POST(req: Request) {
  try {
    const body: Create<%= Name %>Input = await req.json();

    const new<%= Name %>: <%= Name %> = await create<%= Name %>(body);

    return NextResponse.json(new<%= Name %>, { status: 201 });
  } catch (err) {
    console.error('POST <%= name %> error:', err);
    return NextResponse.json(
      { error: 'Failed to create <%= name %>' },
      { status: 500 }
    );
  };
};`;

module.exports = route;
