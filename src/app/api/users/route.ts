import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, nome: true, email: true, telefone: true, role: true },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nome, email, telefone, senha, role } = body;

  if (!nome || !email || !senha) {
    return NextResponse.json({ error: 'Campos obrigatórios: nome, email, senha' }, { status: 400 });
  }

  try {
    const novoUsuario = await prisma.user.create({
      data: { nome, email, telefone, senha, role },
    });

    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
