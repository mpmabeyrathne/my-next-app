import { users } from '@/app/utils/models/users';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User, RequestParams } from '@/app/utils/types';

const filePath = path.join(process.cwd(), 'app/utils/models/users.ts');

export async function GET(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;
  const { username, email, firstName, lastName, role, active }: Partial<User> =
    await req.json();

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Update only the fields that are provided
  users[index] = {
    ...users[index],
    username: username ?? users[index].username,
    email: email ?? users[index].email,
    firstName: firstName ?? users[index].firstName,
    lastName: lastName ?? users[index].lastName,
    role: role ?? users[index].role,
    active: active ?? users[index].active,
  };

  const updatedUsersJSON = JSON.stringify(users, null, 2);

  fs.writeFileSync(
    filePath,
    `export const users = ${updatedUsersJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { result: 'User updated successfully' },
    { status: 200 },
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users.splice(index, 1);

  const updatedUsersJSON = JSON.stringify(users, null, 2);

  fs.writeFileSync(
    filePath,
    `export const users = ${updatedUsersJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { result: 'User deleted successfully' },
    { status: 200 },
  );
}
