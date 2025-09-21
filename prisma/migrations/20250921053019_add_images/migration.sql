-- CreateTable
CREATE TABLE "servico_imagens" (
    "id" SERIAL NOT NULL,
    "servicoId" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "servico_imagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_imagens" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "produto_imagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servico_imagens" ADD CONSTRAINT "servico_imagens_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_imagens" ADD CONSTRAINT "produto_imagens_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
