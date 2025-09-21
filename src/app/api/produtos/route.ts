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

// GET /api/produtos
export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      where: { deletado: false },
      orderBy: { id: "asc" },
      include: { imagens: true }, // inclui imagens
    });
    return withCORS(NextResponse.json(produtos));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}

// POST /api/produtos
export async function POST(req: Request) {
  try {
    const { nome, descricao, preco, estoque, imagens } = await req.json();

    if (!nome || !descricao || !preco || estoque == null) {
      return withCORS(
        NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
      );
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        estoque,
        imagens: imagens && imagens.length > 0 
          ? { create: imagens.map((url: string) => ({ url })) }
          : undefined,
      },
      include: { imagens: true },
    });

    return withCORS(NextResponse.json(produto, { status: 201 }));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}
