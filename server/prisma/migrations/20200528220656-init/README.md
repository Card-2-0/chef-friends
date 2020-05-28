# Migration `20200528220656-init`

This migration has been generated at 5/28/2020, 10:06:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email"

ALTER TABLE "public"."User" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "userId",
ADD COLUMN "userId" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200528215846-init..20200528220656-init
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
@@ -12,9 +12,8 @@
 model User {
   id       String  @default(cuid()) @id
   name     String
-  email    String  @unique
-  password String
+  userId   String
   rating   String  @default("0")
   friends  User[]  @relation("Friends")
 }
```


