import { NextResponse } from 'next/server';
import {
  getAllUsers,
  createUser
} from '@/lib/db/user';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (err) {
    console.error('GET users error:', err);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};

export async function POST(req) {
  try {
    const { name, address } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const newUser = await createUser({ name, address });
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error('POST user error:', err);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
};