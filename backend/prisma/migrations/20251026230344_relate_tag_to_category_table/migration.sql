/*
  Warnings:

  - You are about to drop the column `category` on the `tags` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."quiz_options" DROP CONSTRAINT "quiz_options_tagId_fkey";

-- AlterTable
ALTER TABLE "public"."tags" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."tags" ADD CONSTRAINT "tags_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_options" ADD CONSTRAINT "quiz_options_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
