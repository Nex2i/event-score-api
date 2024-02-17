-- CreateTable
CREATE TABLE "EventQRScan" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventQRScan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventQRScan" ADD CONSTRAINT "EventQRScan_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
