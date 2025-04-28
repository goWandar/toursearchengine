/*
  Warnings:

  - You are about to drop the `beta_subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tour_packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."tour_images" DROP CONSTRAINT "tour_images_tour_id_fkey";

-- DropTable
DROP TABLE "public"."beta_subscribers";

-- DropTable
DROP TABLE "public"."tour_images";

-- DropTable
DROP TABLE "public"."tour_packages";

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
    "id" TEXT NOT NULL,
    "uniqueid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "durationInDays" INTEGER NOT NULL,
    "itinerary" TEXT,
    "siteURL" TEXT,
    "rating" DOUBLE PRECISION,
    "reviews" INTEGER,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_images" (
    "id" TEXT NOT NULL,
    "image_urls" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "tourId" TEXT NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_prices" (
    "id" TEXT NOT NULL,
    "numOfPeople" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "pricePerPerson" DOUBLE PRECISION NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,
    "tourId" TEXT NOT NULL,

    CONSTRAINT "tour_prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "beta_subscribers_email_key" ON "beta_subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_uniqueid_key" ON "tours"("uniqueid");

-- AddForeignKey
ALTER TABLE "tour_images" ADD CONSTRAINT "tour_images_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_prices" ADD CONSTRAINT "tour_prices_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;
