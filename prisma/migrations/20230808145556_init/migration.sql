-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Champion_league_id_key" ON "Champion"("league_id");

-- CreateIndex
CREATE UNIQUE INDEX "Champion_name_key" ON "Champion"("name");
