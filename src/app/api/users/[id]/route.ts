// src/app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import {
  getUserById,
  updateUserById,
  deleteUserById,
} from '@/library/db/user';
import type { User, UpdateUserInput } from '@/types/user';

// GET /api/users/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('GET user error:', err);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);
    const body: UpdateUserInput = await req.json();

    if (body.id !== userId) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    }

    const updated: User = await updateUserById(userId, body);
    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT user error:', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/users/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = parseInt(id, 10);
    await deleteUserById(userId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE user error:', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
