/*
  Warnings:

  - You are about to drop the `_TourParks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `beta_subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `operators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_TourParks" DROP CONSTRAINT "_TourParks_parkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TourParks" DROP CONSTRAINT "_TourParks_tourId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tour_images" DROP CONSTRAINT "tour_images_tourId_tourUniqueId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tour_prices" DROP CONSTRAINT "tour_prices_tourId_tourUniqueId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tours" DROP CONSTRAINT "tours_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tours" DROP CONSTRAINT "tours_operatorId_fkey";

-- DropTable
DROP TABLE "public"."_TourParks";

-- DropTable
DROP TABLE "public"."beta_subscribers";

-- DropTable
DROP TABLE "public"."countries";

-- DropTable
DROP TABLE "public"."operators";

-- DropTable
DROP TABLE "public"."parks";

-- DropTable
DROP TABLE "public"."tour_images";

-- DropTable
DROP TABLE "public"."tour_prices";

-- DropTable
DROP TABLE "public"."tours";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "_TourParks" (
    "tourId" INTEGER NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "_TourParks_pkey" PRIMARY KEY ("tourId","parkId")
);

-- CreateTable
CREATE TABLE "beta_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "beta_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "parks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_images" (
    "id" SERIAL NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "tourId" INTEGER NOT NULL,
    "tourUniqueId" TEXT NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_prices" (
    "id" SERIAL NOT NULL,
    "numOfPeople" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,
    "pricePerPerson" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "seasonName" TEXT,
    "seasonPeriod" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "tourId" INTEGER NOT NULL,
    "tourUniqueId" TEXT NOT NULL,

    CONSTRAINT "tour_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "countryId" INTEGER,
    "durationInDays" INTEGER NOT NULL DEFAULT 0,
    "itinerary" TEXT,
    "accommodationType" TEXT,
    "siteURL" TEXT,
    "included" TEXT,
    "excluded" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "operatorId" INTEGER,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beta_subscribers_email_key" ON "beta_subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "operators_name_key" ON "operators"("name");

-- CreateIndex
CREATE UNIQUE INDEX "parks_name_key" ON "parks"("name");

-- CreateIndex
CREATE INDEX "tour_images_tourId_tourUniqueId_idx" ON "tour_images"("tourId", "tourUniqueId");

-- CreateIndex
CREATE INDEX "tour_prices_tourId_tourUniqueId_idx" ON "tour_prices"("tourId", "tourUniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "tours_uniqueId_key" ON "tours"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "tours_id_uniqueId_key" ON "tours"("id", "uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "_TourParks" ADD CONSTRAINT "_TourParks_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourParks" ADD CONSTRAINT "_TourParks_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_images" ADD CONSTRAINT "tour_images_tourId_tourUniqueId_fkey" FOREIGN KEY ("tourId", "tourUniqueId") REFERENCES "tours"("id", "uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_prices" ADD CONSTRAINT "tour_prices_tourId_tourUniqueId_fkey" FOREIGN KEY ("tourId", "tourUniqueId") REFERENCES "tours"("id", "uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
