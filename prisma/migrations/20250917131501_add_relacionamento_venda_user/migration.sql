-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'BARBEIRO';

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "estoque" INTEGER NOT NULL,
    "D_E_L_E_T_" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "clienteId" TEXT NOT NULL,
    "dataVenda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "D_E_L_E_T_" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_venda" (
    "id" SERIAL NOT NULL,
    "vendaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "D_E_L_E_T_" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "itens_venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_venda" ADD CONSTRAINT "itens_venda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_venda" ADD CONSTRAINT "itens_venda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
