import { withCORS } from '@/lib/cors';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// GET /api/produtos/:id
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { imagens: true },
    });

    if (!produto || produto.deletado) {
      return withCORS(NextResponse.json({ error: "Produto não encontrado" }, { status: 404 }));
    }

    return withCORS(NextResponse.json(produto));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}

// PUT /api/produtos/:id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { nome, descricao, preco, estoque, imagens } = await req.json();
    const { id } = await context.params;

    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao,
        preco,
        estoque,
        ...(imagens
          ? {
              imagens: {
                deleteMany: {}, // remove todas as imagens antigas
                create: imagens.map((url: string) => ({ url })), // adiciona novas
              },
            }
          : {}),
      },
      include: { imagens: true },
    });

    return withCORS(NextResponse.json(produto));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}

// DELETE /api/produtos/:id  (soft delete)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.produto.update({
      where: { id: Number(id) },
      data: { deletado: true },
    });

    return withCORS(NextResponse.json({ message: "Produto excluído com sucesso" }));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}
