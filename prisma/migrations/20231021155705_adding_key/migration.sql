-- AlterTable
ALTER TABLE "Build" ADD COLUMN     "keyId" TEXT;

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "Key"("id") ON DELETE SET NULL ON UPDATE CASCADE;
