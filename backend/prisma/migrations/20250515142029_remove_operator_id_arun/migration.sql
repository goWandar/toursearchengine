/*
  Warnings:

  - You are about to drop the `beta_subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `operator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tour_images" DROP CONSTRAINT "tour_images_tourId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tour_prices" DROP CONSTRAINT "tour_prices_tourId_fkey";

-- DropTable
DROP TABLE "public"."beta_subscribers";

-- DropTable
DROP TABLE "public"."operator";

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
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "beta_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "uniqueId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "durationInDays" INTEGER NOT NULL DEFAULT 0,
    "itinerary" TEXT,
    "safariType" TEXT,
    "accommodationType" TEXT,
    "siteURL" TEXT,
    "included" TEXT,
    "excluded" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "reviews" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_images" (
    "id" SERIAL NOT NULL,
    "image_urls" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_prices" (
    "id" SERIAL NOT NULL,
    "numOfPeople" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL,
    "pricePerPerson" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "seasonName" TEXT NOT NULL,
    "seasonPeriod" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "tourId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tour_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "beta_subscribers_email_key" ON "beta_subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_uniqueId_key" ON "tours"("uniqueId");

-- AddForeignKey
ALTER TABLE "tour_images" ADD CONSTRAINT "tour_images_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_prices" ADD CONSTRAINT "tour_prices_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;
