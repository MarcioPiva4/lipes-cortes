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

// GET /api/vendas/:id
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
      include: { cliente: true, itens: { include: { produto: true } } },
    });

    if (!venda || venda.deletado) {
      return withCORS(NextResponse.json({ error: "Venda não encontrada" }, { status: 404 }));
    }

    return withCORS(NextResponse.json(venda));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}

// DELETE /api/vendas/:id  (cancelar e devolver estoque)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
      include: { itens: true },
    });

    if (!venda || venda.deletado) {
      return withCORS(NextResponse.json({ error: "Venda não encontrada" }, { status: 404 }));
    }

    // Devolve estoque
    for (const item of venda.itens) {
      await prisma.produto.update({
        where: { id: item.produtoId },
        data: { estoque: { increment: item.quantidade } },
      });
    }

    await prisma.venda.update({
      where: { id: Number(id) },
      data: { deletado: true },
    });

    return withCORS(NextResponse.json({ message: "Venda cancelada e estoque devolvido" }));
  } catch (err: any) {
    return withCORS(NextResponse.json({ error: err.message }, { status: 500 }));
  }
}
