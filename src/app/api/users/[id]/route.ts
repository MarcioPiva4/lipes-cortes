import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withCORS } from "@/lib/cors";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, telefone: true, role: true },
    });

    if (!user) {
      return withCORS(NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 }));
    }

    return withCORS(NextResponse.json(user));
  } catch (error) {
    return withCORS(NextResponse.json(
      { message: "Erro ao buscar usuário", error: (error as Error).message },
      { status: 500 }
    ));
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { nome, email, telefone, senha, role } = await req.json();

    const userAtualizado = await prisma.user.update({
      where: { id },
      data: { nome, email, telefone, senha, role },
    });

    return withCORS(NextResponse.json(userAtualizado));
  } catch (error) {
    return withCORS(NextResponse.json(
      { message: "Erro ao atualizar usuário", error: (error as Error).message },
      { status: 500 }
    ));
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.user.delete({
      where: { id },
    });

    return withCORS(NextResponse.json({ message: "Usuário deletado com sucesso" }));
  } catch (error) {
    return withCORS(NextResponse.json(
      { message: "Erro ao deletar usuário", error: (error as Error).message },
      { status: 500 }
    ));
  }
}
