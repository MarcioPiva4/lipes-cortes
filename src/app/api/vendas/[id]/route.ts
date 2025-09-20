import { PrismaClient } from "@prisma/client/extension";
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
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const venda = await prisma.venda.findUnique({
      where: { id: Number(params.id) },
      include: { cliente: true, itens: { include: { produto: true } } },
    });

    if (!venda || venda.deletado) {
      return NextResponse.json({ error: "Venda não encontrada" }, { status: 404 });
    }

    return NextResponse.json(venda);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/vendas/:id  (cancelar e devolver estoque)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const venda = await prisma.venda.findUnique({
      where: { id: Number(params.id) },
      include: { itens: true },
    });

    if (!venda || venda.deletado) {
      return NextResponse.json({ error: "Venda não encontrada" }, { status: 404 });
    }

    // Devolve estoque
    for (const item of venda.itens) {
      await prisma.produto.update({
        where: { id: item.produtoId },
        data: { estoque: { increment: item.quantidade } },
      });
    }

    await prisma.venda.update({
      where: { id: Number(params.id) },
      data: { deletado: true },
    });

    return NextResponse.json({ message: "Venda cancelada e estoque devolvido" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
