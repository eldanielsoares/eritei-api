/*
  Warnings:

  - You are about to drop the column `cheap` on the `cards` table. All the data in the column will be lost.
  - Added the required column `cheapId` to the `userCards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shots" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cheapId" TEXT,
    CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_cheapId_fkey" FOREIGN KEY ("cheapId") REFERENCES "cheaps" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("categoryId", "cheapId", "createdAt", "description", "id", "image", "isFree", "shots", "updatedAt", "weight") SELECT "categoryId", "cheapId", "createdAt", "description", "id", "image", "isFree", "shots", "updatedAt", "weight" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE TABLE "new_userCards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "cheapId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "userCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "userCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "userCards_cheapId_fkey" FOREIGN KEY ("cheapId") REFERENCES "cheaps" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_userCards" ("cardId", "createdAt", "id", "updatedAt", "userId") SELECT "cardId", "createdAt", "id", "updatedAt", "userId" FROM "userCards";
DROP TABLE "userCards";
ALTER TABLE "new_userCards" RENAME TO "userCards";
CREATE UNIQUE INDEX "userCards_userId_cardId_key" ON "userCards"("userId", "cardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
