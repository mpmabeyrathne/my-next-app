import { users } from '@/app/utils/models/users';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/app/utils/types';

const filePath = path.join(process.cwd(), 'app/utils/models/users.ts');

// Retrieve all users
export function GET(): NextResponse {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

// Create user
export async function POST(req: Request): Promise<NextResponse> {
  const { username, email, password, firstName, lastName }: Partial<User> =
    await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { Result: 'Missing some fields' },
      { status: 400 },
    );
  }

  const ids = users.map((user) => Number(user.id));
  const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const newUser: User = {
    id: String(nextId),
    username,
    email,
    password,
    firstName: firstName || '',
    lastName: lastName || '',
  };

  users.push(newUser);

  const updatedUsersJSON = JSON.stringify(users, null, 2);
  fs.writeFileSync(
    filePath,
    `export const users = ${updatedUsersJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { Result: 'User added successfully' },
    { status: 201 },
  );
}
