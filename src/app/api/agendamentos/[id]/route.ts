import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { withCORS } from '@/lib/cors';

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

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    const updated = await prisma.agendamento.update({
      where: { id },
      data: { status },
    });

    return withCORS(NextResponse.json(updated));
  } catch (error) {
    return withCORS(NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const { novaData, servicoIds } = body;

    // Validação da data, se fornecida
    if (novaData) {
      const dataAgendamento = new Date(novaData);
      if (isNaN(dataAgendamento.getTime())) {
        return withCORS(NextResponse.json({ error: "Formato de data inválido" }, { status: 400 }));
      }

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      if (dataAgendamento <= hoje) {
        return withCORS(NextResponse.json({ error: "Não é possível agendar para hoje ou dias passados" }, { status: 400 }));
      }

      const diaSemana = dataAgendamento.getDay();
      if (diaSemana === 0 || diaSemana === 6) {
        return withCORS(NextResponse.json({ error: "Agendamentos não são permitidos aos finais de semana" }, { status: 400 }));
      }

      const hora = dataAgendamento.getHours();
      if (hora < 8 || hora > 18) {
        return withCORS(NextResponse.json({ error: "Horário fora do expediente (08:00 - 18:00)" }, { status: 400 }));
      }

      const conflito = await prisma.agendamento.findFirst({
        where: { dataAgendamento },
      });

      if (conflito && conflito.id !== id) {
        return withCORS(NextResponse.json({ error: "Já existe um agendamento para esse horário" }, { status: 400 }));
      }

      await prisma.agendamento.update({
        where: { id },
        data: { dataAgendamento },
      });
    }

    // Atualiza os serviços associados (se fornecidos)
    if (servicoIds && Array.isArray(servicoIds)) {
      // Remove os serviços antigos
      await prisma.agendamentoServico.deleteMany({
        where: { agendamentoId: id },
      });

      // Adiciona os novos
      const novosServicos = servicoIds.map((servicoId: string) => ({
        agendamentoId: id,
        servicoId,
      }));

      await prisma.agendamentoServico.createMany({
        data: novosServicos,
      });
    }

    const agendamentoAtualizado = await prisma.agendamento.findUnique({
      where: { id },
      include: {
        servicos: { include: { servico: true } },
      },
    });

    return withCORS(NextResponse.json(agendamentoAtualizado, { status: 200 }));
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    return withCORS(NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 }));
  }
}

