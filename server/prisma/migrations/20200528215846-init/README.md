# Migration `20200528215846-init`

This migration has been generated at 5/28/2020, 9:58:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,"rating" text  NOT NULL DEFAULT E'0',"userId" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200528012915..20200528215846-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,5 +15,6 @@
   name     String
   email    String  @unique
   password String
   rating   String  @default("0")
+  friends  User[]  @relation("Friends")
 }
```


