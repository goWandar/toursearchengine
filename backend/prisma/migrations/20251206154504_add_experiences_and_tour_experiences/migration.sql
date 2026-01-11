-- CreateTable
CREATE TABLE "public"."experiences" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_TourExperiences" (
    "tourId" INTEGER NOT NULL,
    "experienceId" INTEGER NOT NULL,

    CONSTRAINT "_TourExperiences_pkey" PRIMARY KEY ("tourId","experienceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "experiences_name_key" ON "public"."experiences"("name");

-- AddForeignKey
ALTER TABLE "public"."_TourExperiences" ADD CONSTRAINT "_TourExperiences_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "public"."tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TourExperiences" ADD CONSTRAINT "_TourExperiences_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "public"."experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
