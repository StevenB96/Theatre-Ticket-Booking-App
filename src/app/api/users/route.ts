// app/api/users/route.ts
import { NextResponse } from 'next/server';
import {
  getAllUsers,
  createUser,
} from '@/library/db/user';
import {
  User,
  CreateUserInput,
} from '@/types/user';

// GET /api/users
export async function GET() {
  try {
    const users: User[] = await getAllUsers();
    return NextResponse.json(users);
  } catch (err) {
    console.error('GET users error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body: CreateUserInput = await req.json();

    const newUser: User = await createUser(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error('POST user error:', err);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  };
};