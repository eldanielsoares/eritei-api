/*
  Warnings:

  - Added the required column `shots` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "deckId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("categoryId", "createdAt", "deckId", "description", "id", "image", "isFree", "level", "updatedAt", "weight") SELECT "categoryId", "createdAt", "deckId", "description", "id", "image", "isFree", "level", "updatedAt", "weight" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
