import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withCORS } from "@/lib/cors";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// GET /api/servicos
export async function GET() {
  try {
    const servicos = await prisma.servico.findMany({
      include: { imagens: true },
    });
    return withCORS(NextResponse.json(servicos));
  } catch (error) {
    return withCORS(
      NextResponse.json({ message: "Erro ao buscar serviços", error }, { status: 500 })
    );
  }
}

// POST /api/servicos
export async function POST(req: NextRequest) {
  try {
    const { nome, descricao, preco, duracao, imagens }: 
      { nome: string; descricao: string; preco: number; duracao: number; imagens?: string[] } = await req.json();

    if (!nome || !descricao || preco === undefined || !duracao) {
      return withCORS(
        NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 })
      );
    }

    const novoServico = await prisma.servico.create({
      data: {
        nome,
        descricao,
        preco,
        duracao,
        imagens: imagens && imagens.length > 0 
          ? { create: imagens.map((url) => ({ url })) }
          : undefined,
      },
      include: { imagens: true },
    });

    return withCORS(NextResponse.json(novoServico, { status: 201 }));
  } catch (error) {
    return withCORS(
      NextResponse.json({ message: "Erro ao criar serviço", error }, { status: 500 })
    );
  }
}