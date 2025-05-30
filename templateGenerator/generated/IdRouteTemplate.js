import { NextResponse } from 'next/server';
import {
  getUserById,
  updateUser,
  deleteUser
} from '@/lib/db/user';

export async function GET(_, { params }) {
  try {
    const { id: userId } = await params;
    const user = await getUserById(Number(userId));
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error('GET user error:', err);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
};

export async function PUT(req, { params }) {
  try {
    const { name, address } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const { id: userId } = await params;
    const updated = await updateUser(Number(userId), { name, address });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT user error:', err);

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
};

export async function DELETE(_, { params }) {
  try {
    const { id: userId } = await params;
    await deleteUser(Number(userId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE user error:', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
};