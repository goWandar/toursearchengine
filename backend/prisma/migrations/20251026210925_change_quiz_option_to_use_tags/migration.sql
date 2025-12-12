/*
  Warnings:

  - You are about to drop the column `categoryId` on the `quiz_options` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionId,tagId]` on the table `quiz_options` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `quiz_options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."quiz_options" DROP CONSTRAINT "quiz_options_categoryId_fkey";

-- DropIndex
DROP INDEX "public"."quiz_options_questionId_categoryId_key";

-- AlterTable
ALTER TABLE "public"."quiz_options" DROP COLUMN "categoryId",
ADD COLUMN     "tagId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "quiz_options_questionId_tagId_key" ON "public"."quiz_options"("questionId", "tagId");

-- AddForeignKey
ALTER TABLE "public"."quiz_options" ADD CONSTRAINT "quiz_options_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
