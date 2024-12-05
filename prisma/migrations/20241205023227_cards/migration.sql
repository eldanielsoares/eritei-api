-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userCards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deckId" TEXT,
    CONSTRAINT "userCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "decks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_userCards" ("cardId", "createdAt", "deckId", "id", "updatedAt", "userId") SELECT "cardId", "createdAt", "deckId", "id", "updatedAt", "userId" FROM "userCards";
DROP TABLE "userCards";
ALTER TABLE "new_userCards" RENAME TO "userCards";
CREATE UNIQUE INDEX "userCards_userId_cardId_key" ON "userCards"("userId", "cardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
