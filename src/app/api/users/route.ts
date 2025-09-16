// app/api/users/route.ts
import { withCORS } from '@/lib/cors';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET /api/users
export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, nome: true, email: true, telefone: true, role: true },
  });

  return withCORS(NextResponse.json(users));
}

// POST /api/users
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nome, email, telefone, senha, role } = body;

  if (!nome || !email || !senha) {
    return withCORS(
      NextResponse.json({ error: 'Campos obrigatórios: nome, email, senha' }, { status: 400 })
    );
  }

  try {
    const novoUsuario = await prisma.user.create({
      data: { nome, email, telefone, senha, role },
    });

    return withCORS(NextResponse.json(novoUsuario, { status: 201 }));
  } catch (error: any) {
    return withCORS(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

// OPTIONS (CORS preflight)
export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}
