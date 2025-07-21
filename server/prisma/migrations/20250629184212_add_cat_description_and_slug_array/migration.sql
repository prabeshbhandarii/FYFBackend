/*
  Warnings:

  - The `slug` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
DROP COLUMN "slug",
ADD COLUMN     "slug" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
