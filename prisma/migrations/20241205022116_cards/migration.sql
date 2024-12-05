/*
  Warnings:

  - You are about to drop the `cheaps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cheapId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `shots` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `cheapId` on the `userCards` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `userCards` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cheaps";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "decks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "deckId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("categoryId", "createdAt", "description", "id", "image", "isFree", "level", "updatedAt", "weight") SELECT "categoryId", "createdAt", "description", "id", "image", "isFree", "level", "updatedAt", "weight" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE TABLE "new_userCards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "userCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_userCards" ("cardId", "createdAt", "id", "updatedAt", "userId") SELECT "cardId", "createdAt", "id", "updatedAt", "userId" FROM "userCards";
DROP TABLE "userCards";
ALTER TABLE "new_userCards" RENAME TO "userCards";
CREATE UNIQUE INDEX "userCards_userId_cardId_key" ON "userCards"("userId", "cardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
