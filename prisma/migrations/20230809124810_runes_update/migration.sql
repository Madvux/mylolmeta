-- CreateTable
CREATE TABLE "Perks" (
    "id" TEXT NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "row" INTEGER NOT NULL,
    "runeId" TEXT NOT NULL,

    CONSTRAINT "Perks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perks_league_id_key" ON "Perks"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Perks_name_key" ON "Perks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Perks_key_key" ON "Perks"("key");

-- AddForeignKey
ALTER TABLE "Perks" ADD CONSTRAINT "Perks_runeId_fkey" FOREIGN KEY ("runeId") REFERENCES "Rune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
