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

// GET /api/vendas
export async function GET() {
  try {
    const vendas = await prisma.venda.findMany({
      where: { deletado: false },
      include: { 
        cliente: true, 
        itens: { include: { produto: true } } 
      },
      orderBy: { dataVenda: "desc" },
    });
    return NextResponse.json(vendas);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/vendas
export async function POST(req: Request) {
  try {
    const { clienteId, itens } = await req.json();
    // itens: [{ produtoId, quantidade }]

    if (!clienteId || !itens || itens.length === 0) {
      return NextResponse.json({ error: "Cliente e itens são obrigatórios" }, { status: 400 });
    }

    let total = 0;
    const itensVenda: any[] = [];

    for (const item of itens) {
      const produto = await prisma.produto.findUnique({
        where: { id: item.produtoId },
      });

      if (!produto || produto.deletado) {
        return NextResponse.json({ error: `Produto ${item.produtoId} não encontrado` }, { status: 404 });
      }

      if (produto.estoque < item.quantidade) {
        return NextResponse.json({ error: `Estoque insuficiente para ${produto.nome}` }, { status: 400 });
      }

      total += produto.preco * item.quantidade;

      itensVenda.push({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
      });

      // Decrementa estoque
      await prisma.produto.update({
        where: { id: item.produtoId },
        data: { estoque: { decrement: item.quantidade } },
      });
    }

    const venda = await prisma.venda.create({
      data: {
        clienteId,
        total,
        itens: { create: itensVenda },
      },
      include: { itens: { include: { produto: true } } },
    });

    return NextResponse.json(venda, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
