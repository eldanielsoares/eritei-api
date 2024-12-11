/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `purchases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "purchases_paymentId_key" ON "purchases"("paymentId");
