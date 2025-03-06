/*
  Warnings:

  - You are about to drop the `TweetImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "tweetImages" TEXT[];

-- DropTable
DROP TABLE "TweetImages";
