// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { UserModel } from '@/models/UserModel';
import {
  User,
  UpdateUserInput
} from '@/types/user';

// GET /api/users/:id
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userIdFromUrl = parseInt(id, 10);
    const model = await UserModel.find(userIdFromUrl);
    if (!model || !model.data) {
      throw new Error('User not found');
    }
    const user: User = model.data;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('GET user error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT /api/users/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdateUserInput = await req.json();
    const { id } = await context.params;
    const userIdFromUrl = parseInt(id, 10);

    if (body.id !== userIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const model = await UserModel.update(userIdFromUrl, body);
    if (!model || !model.data) {
      throw new Error('User not found');
    }
    const updated: User = model.data;

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PUT user error:', err);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/:id
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userIdFromUrl = parseInt(id, 10);
    await UserModel.delete(userIdFromUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE user error:', err);

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
};