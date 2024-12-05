/*
  Warnings:

  - You are about to drop the column `cheapId` on the `matches` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_matches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "shots" INTEGER NOT NULL DEFAULT 0,
    "deckId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "matches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_matches" ("createdAt", "id", "shots", "updatedAt", "userId") SELECT "createdAt", "id", "shots", "updatedAt", "userId" FROM "matches";
DROP TABLE "matches";
ALTER TABLE "new_matches" RENAME TO "matches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
