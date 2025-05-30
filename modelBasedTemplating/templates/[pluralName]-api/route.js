// templates/route.js
const route = `import { NextResponse } from 'next/server';
import {
  getAll<%= PluralName %>,
  create<%= Name %>
} from '@/lib/db/<%= name %>';

export async function GET() {
  try {
    const <%= pluralName %> = await getAll<%= PluralName %>();
    return NextResponse.json(<%= pluralName %>);
  } catch (err) {
    console.error('GET <%= pluralName %> error:', err);
    return NextResponse.json({ error: 'Failed to fetch <%= pluralName %>' }, { status: 500 });
  }
};

export async function POST(req) {
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

    const new<%= Name %> = await create<%= Name %>({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. name,
      */
    });

    return NextResponse.json(new<%= Name %>, { status: 201 });
  } catch (err) {
    console.error('POST <%= name %> error:', err);
    return NextResponse.json({ error: 'Failed to create <%= name %>' }, { status: 500 });
  }
};`;

module.exports = route;
