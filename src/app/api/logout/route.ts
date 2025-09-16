import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { withCORS } from '@/lib/cors';

export async function POST() {
  (await cookies()).set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return withCORS(NextResponse.json({ message: 'Logout realizado com sucesso' }, { status: 200 }));
}
