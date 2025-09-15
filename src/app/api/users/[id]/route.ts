import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, nome: true, email: true, telefone: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { nome, email, telefone, senha, role } = body;

  try {
    const usuarioAtualizado = await prisma.user.update({
      where: { id: params.id },
      data: { nome, email, telefone, senha, role },
    });

    return NextResponse.json(usuarioAtualizado);
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao atualizar usuário: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao deletar usuário: ' + error.message }, { status: 500 });
  }
}
