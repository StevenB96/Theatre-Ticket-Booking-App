import { NextResponse } from 'next/server';
import { getAllUsers, createUser } from '@/library/db/user';

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (err) {
    console.error('GET users error:', err);
    return NextResponse.json({
      error: 'Failed to fetch users'
    }, { status: 500 });
  }
};

export async function POST(req) {
  try {
    const {
      username,
      email,
      password,
      role,
      status,
    } = await req.json();

    if (
      !username ||
      !email ||
      !password ||
      !role ||
      !status
    ) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    };

    const newUser = await createUser({
      username,
      email,
      password,
      role,
      status,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error('POST user error:', err);
    return NextResponse.json({
      error: 'Failed to create user'
    }, { status: 500 });
  }
};

