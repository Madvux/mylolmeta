/*
  Warnings:

  - You are about to drop the column `buildId` on the `Rune` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rune" DROP CONSTRAINT "Rune_buildId_fkey";

-- AlterTable
ALTER TABLE "Perk" ADD COLUMN     "runeBuildId" TEXT;

-- AlterTable
ALTER TABLE "Rune" DROP COLUMN "buildId";

-- CreateTable
CREATE TABLE "RuneBuild" (
    "id" TEXT NOT NULL,
    "buildId" TEXT,

    CONSTRAINT "RuneBuild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Perk" ADD CONSTRAINT "Perk_runeBuildId_fkey" FOREIGN KEY ("runeBuildId") REFERENCES "RuneBuild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuild" ADD CONSTRAINT "RuneBuild_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE SET NULL ON UPDATE CASCADE;
