-- CreateTable
CREATE TABLE "cheaps" (
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
    "shots" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "cheap" TEXT NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cheapId" TEXT,
    CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_cheapId_fkey" FOREIGN KEY ("cheapId") REFERENCES "cheaps" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("categoryId", "cheap", "createdAt", "description", "id", "image", "isFree", "shots", "updatedAt", "weight") SELECT "categoryId", "cheap", "createdAt", "description", "id", "image", "isFree", "shots", "updatedAt", "weight" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
