-- CreateTable
CREATE TABLE "public"."countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."parks" (
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
CREATE TABLE "public"."_TourParks" (
    "tourId" INTEGER NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "_TourParks_pkey" PRIMARY KEY ("tourId","parkId")
);

-- CreateTable
CREATE TABLE "public"."operators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tour_images" (
    "id" SERIAL NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),
    "tourId" INTEGER NOT NULL,
    "tourUniqueId" TEXT NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tour_prices" (
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
CREATE TABLE "public"."tours" (
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

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "public"."countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "parks_name_key" ON "public"."parks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "operators_name_key" ON "public"."operators"("name");

-- CreateIndex
CREATE INDEX "tour_images_tourId_tourUniqueId_idx" ON "public"."tour_images"("tourId", "tourUniqueId");

-- CreateIndex
CREATE INDEX "tour_prices_tourId_tourUniqueId_idx" ON "public"."tour_prices"("tourId", "tourUniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "tours_uniqueId_key" ON "public"."tours"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "tours_id_uniqueId_key" ON "public"."tours"("id", "uniqueId");

-- AddForeignKey
ALTER TABLE "public"."_TourParks" ADD CONSTRAINT "_TourParks_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "public"."tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TourParks" ADD CONSTRAINT "_TourParks_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "public"."parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tour_images" ADD CONSTRAINT "tour_images_tourId_tourUniqueId_fkey" FOREIGN KEY ("tourId", "tourUniqueId") REFERENCES "public"."tours"("id", "uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tour_prices" ADD CONSTRAINT "tour_prices_tourId_tourUniqueId_fkey" FOREIGN KEY ("tourId", "tourUniqueId") REFERENCES "public"."tours"("id", "uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tours" ADD CONSTRAINT "tours_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tours" ADD CONSTRAINT "tours_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "public"."operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
