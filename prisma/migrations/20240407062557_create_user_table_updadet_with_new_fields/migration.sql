-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("email", "first_name", "id", "last_name", "password") SELECT "email", "first_name", "id", "last_name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
