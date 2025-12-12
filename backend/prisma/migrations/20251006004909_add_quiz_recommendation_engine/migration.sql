/*
  Warnings:

  - You are about to drop the column `quiz_1_selection` on the `quiz_responses` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_2_selection` on the `quiz_responses` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_3_selection` on the `quiz_responses` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_4_selection` on the `quiz_responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."quiz_responses" DROP COLUMN "quiz_1_selection",
DROP COLUMN "quiz_2_selection",
DROP COLUMN "quiz_3_selection",
DROP COLUMN "quiz_4_selection",
ADD COLUMN     "confidenceLevel" INTEGER,
ADD COLUMN     "personaId" INTEGER,
ADD COLUMN     "quizSelections" JSONB,
ADD COLUMN     "stageId" INTEGER;

-- CreateTable
CREATE TABLE "public"."conflict_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conflict_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "conflictGroupId" INTEGER,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tour_categories" (
    "tourId" INTEGER NOT NULL,
    "tourUniqueId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tour_categories_pkey" PRIMARY KEY ("tourId","tourUniqueId","categoryId")
);

-- CreateTable
CREATE TABLE "public"."quiz_stages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_personas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "keyTraits" TEXT[],
    "tagMapping" TEXT[],
    "imageUrl" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stageId" INTEGER,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_options" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "optionText" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_insights" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER,
    "optionId" INTEGER,
    "insightText" TEXT NOT NULL,
    "contextType" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_answers" (
    "id" SERIAL NOT NULL,
    "responseId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "conflict_groups_name_key" ON "public"."conflict_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_stages_name_key" ON "public"."quiz_stages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_personas_name_key" ON "public"."quiz_personas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_questions_orderIndex_key" ON "public"."quiz_questions"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_options_questionId_categoryId_key" ON "public"."quiz_options"("questionId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_answers_responseId_questionId_key" ON "public"."quiz_answers"("responseId", "questionId");

-- CreateIndex
CREATE INDEX "quiz_responses_sessionId_idx" ON "public"."quiz_responses"("sessionId");

-- CreateIndex
CREATE INDEX "tours_countryId_idx" ON "public"."tours"("countryId");

-- CreateIndex
CREATE INDEX "tours_operatorId_idx" ON "public"."tours"("operatorId");

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_conflictGroupId_fkey" FOREIGN KEY ("conflictGroupId") REFERENCES "public"."conflict_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tour_categories" ADD CONSTRAINT "tour_categories_tourId_tourUniqueId_fkey" FOREIGN KEY ("tourId", "tourUniqueId") REFERENCES "public"."tours"("id", "uniqueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tour_categories" ADD CONSTRAINT "tour_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_responses" ADD CONSTRAINT "quiz_responses_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "public"."quiz_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_responses" ADD CONSTRAINT "quiz_responses_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "public"."quiz_personas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_questions" ADD CONSTRAINT "quiz_questions_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "public"."quiz_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_options" ADD CONSTRAINT "quiz_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_options" ADD CONSTRAINT "quiz_options_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_insights" ADD CONSTRAINT "quiz_insights_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_insights" ADD CONSTRAINT "quiz_insights_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."quiz_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_answers" ADD CONSTRAINT "quiz_answers_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "public"."quiz_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
