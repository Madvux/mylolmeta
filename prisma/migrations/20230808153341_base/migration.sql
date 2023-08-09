/*
  Warnings:

  - The primary key for the `Champion` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Champion" DROP CONSTRAINT "Champion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Champion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Champion_id_seq";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "buildId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rune" (
    "id" TEXT NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "buildId" TEXT,

    CONSTRAINT "Rune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Build" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_league_id_key" ON "Item"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rune_league_id_key" ON "Rune"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rune_name_key" ON "Rune"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rune" ADD CONSTRAINT "Rune_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "Build"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
