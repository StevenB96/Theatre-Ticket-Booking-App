import { NextResponse } from 'next/server';
import {
  getUserById,
  updateUser,
  deleteUser,
} from '@/library/db/user';
import {
  User,
  UpdateUserInput
} from '@/types/user';

// GET /api/users/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    const user = await getUserById(userId);

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
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateUserInput = await req.json();

    const userIdFromUrl = Number(params.id);
    if (body.id !== userIdFromUrl) {
      return NextResponse.json(
        { error: 'ID mismatch between URL and request body' },
        { status: 400 }
      );
    };

    const updated: User = await updateUser(userIdFromUrl, {
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. id: body.id,
      */
    });

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
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    await deleteUser(userId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE user error:', err);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
};