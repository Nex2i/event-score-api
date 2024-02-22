-- CreateTable
CREATE TABLE "CompanyPayment" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "externalPaymentId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPayment_externalPaymentId_key" ON "CompanyPayment"("externalPaymentId");

-- AddForeignKey
ALTER TABLE "CompanyPayment" ADD CONSTRAINT "CompanyPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
