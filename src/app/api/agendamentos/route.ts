// app/api/agendamentos/route.ts

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

export async function GET() {
  try {
    // Retorna todos os agendamentos independentemente do usuário
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        user: { select: { nome: true } },
        servicos: {
          include: {
            servico: {
              select: {
                nome: true,
                preco: true,
              },
            },
          },
        },
      },
      orderBy: {
        dataAgendamento: "desc",
      },
    });

    return withCORS(NextResponse.json(agendamentos));
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);

    return withCORS(
      NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 })
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, dataAgendamento: dataString, servicoIds } = body;

    if (!userId || !dataString || !Array.isArray(servicoIds)) {
      return withCORS(
        NextResponse.json({ error: "Campos obrigatórios: userId, dataAgendamento, servicoIds" }, { status: 400 })
      );
    }

    // Converter a string para Date
    const dataAgendamento = new Date(dataString);

    // Validar conversão de data
    if (isNaN(dataAgendamento.getTime())) {
      return withCORS(NextResponse.json({ error: "Data inválida" }, { status: 400 }));
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // 1. Validar data futura
    if (dataAgendamento <= hoje) {
      return withCORS(
        NextResponse.json({ error: "Não é possível agendar para hoje ou dias passados" }, { status: 400 })
      );
    }

    // 2. Validar dia da semana
    const diaSemana = dataAgendamento.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return withCORS(
        NextResponse.json({ error: "Agendamentos não são permitidos aos finais de semana" }, { status: 400 })
      );
    }

    // 3. Validar horário comercial
    const hora = dataAgendamento.getHours();
    if (hora < 8 || hora > 18) {
      return withCORS(
        NextResponse.json({ error: "Horário fora do expediente (08:00 - 18:00)" }, { status: 400 })
      );
    }

    // 4. Verificar conflitos
    const conflito = await prisma.agendamento.findFirst({
      where: {
        dataAgendamento: dataAgendamento,
        status: 'PENDENTE',
      },
    });

    if (conflito) {
      return withCORS(
        NextResponse.json({ error: "Já existe um agendamento para esse horário" }, { status: 400 })
      );
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        userId,
        dataAgendamento,
        servicos: {
          create: servicoIds.map((servicoId: string) => ({
            servico: { connect: { id: servicoId } },
          })),
        },
      },
      include: { servicos: { include: { servico: true } } },
    });

    return withCORS(NextResponse.json(novoAgendamento, { status: 201 }));
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return withCORS(NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 }));
  }
}
