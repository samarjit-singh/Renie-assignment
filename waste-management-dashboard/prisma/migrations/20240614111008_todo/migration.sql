-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
