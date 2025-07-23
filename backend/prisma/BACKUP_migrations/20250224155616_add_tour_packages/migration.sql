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
CREATE TABLE "tour_packages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration_in_days" INTEGER NOT NULL,
    "site_url" TEXT NOT NULL,
    "rating" TEXT,
    "date_of_scrape" DATE NOT NULL,

    CONSTRAINT "tour_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_images" (
    "id" TEXT NOT NULL,
    "tour_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "beta_subscribers_email_key" ON "beta_subscribers"("email");

-- AddForeignKey
ALTER TABLE "tour_images" ADD CONSTRAINT "tour_images_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tour_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
