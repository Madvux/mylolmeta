/*
  Warnings:

  - You are about to drop the `Perks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Perks" DROP CONSTRAINT "Perks_runeId_fkey";

-- DropTable
DROP TABLE "Perks";

-- CreateTable
CREATE TABLE "Perk" (
    "id" TEXT NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "row" INTEGER NOT NULL,
    "runeId" TEXT NOT NULL,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perk_league_id_key" ON "Perk"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_name_key" ON "Perk"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_key_key" ON "Perk"("key");

-- AddForeignKey
ALTER TABLE "Perk" ADD CONSTRAINT "Perk_runeId_fkey" FOREIGN KEY ("runeId") REFERENCES "Rune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
