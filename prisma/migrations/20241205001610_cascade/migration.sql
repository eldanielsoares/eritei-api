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
    "cheapId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cards_cheapId_fkey" FOREIGN KEY ("cheapId") REFERENCES "cheaps" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "userCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "userCards_cheapId_fkey" FOREIGN KEY ("cheapId") REFERENCES "cheaps" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_userCards" ("cardId", "cheapId", "createdAt", "id", "updatedAt", "userId") SELECT "cardId", "cheapId", "createdAt", "id", "updatedAt", "userId" FROM "userCards";
DROP TABLE "userCards";
ALTER TABLE "new_userCards" RENAME TO "userCards";
CREATE UNIQUE INDEX "userCards_userId_cardId_key" ON "userCards"("userId", "cardId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
