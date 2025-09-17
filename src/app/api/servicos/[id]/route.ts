import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withCORS } from "@/lib/cors";

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

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await context.params;
  
      if (!id) {
        return withCORS(NextResponse.json({ message: "ID do serviço não fornecido" }, { status: 400 }));
      }
  
      const data = await request.json();
  
      const servicoAtualizado = await prisma.servico.update({
        where: { id },
        data,
      });
  
      return withCORS(NextResponse.json(servicoAtualizado));
    } catch (error) {
      return withCORS(NextResponse.json({ message: "Erro ao atualizar serviço", error }, { status: 500 }));
    }
  }

  export async function DELETE(req: NextRequest,  context: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await context.params;

      await prisma.servico.delete({ where: { id } });
  
      return withCORS(NextResponse.json({ message: "Serviço excluído com sucesso" }));
    } catch (error) {
      return withCORS(NextResponse.json(
        { message: "Erro ao excluir serviço", error },
        { status: 500 }
      ));
    }
  }
  