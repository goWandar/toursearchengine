-- CreateTable
CREATE TABLE "public"."beta_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "beta_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beta_subscribers_email_key" ON "public"."beta_subscribers"("email");
