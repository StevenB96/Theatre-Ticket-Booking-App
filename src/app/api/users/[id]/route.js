import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/db/user';

export async function GET(_, { params }) {
  const { id } = params;
  try {
    const user = await getUserById(Number(id));
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (err) {
    console.error('GET user error:', err);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();
  try {
    const updated = await updateUser(Number(id), data);
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT user error:', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    await deleteUser(Number(id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE user error:', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
