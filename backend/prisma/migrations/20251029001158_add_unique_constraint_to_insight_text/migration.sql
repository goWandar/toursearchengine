/*
  Warnings:

  - A unique constraint covering the columns `[insightText]` on the table `quiz_insights` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quiz_insights_insightText_key" ON "public"."quiz_insights"("insightText");
