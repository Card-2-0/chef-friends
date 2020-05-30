# Migration `20200530130708-init`

This migration has been generated at 5/30/2020, 1:07:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,"userid" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Chef" (
"id" text  NOT NULL ,"rating" text  NOT NULL DEFAULT E'0',"userid" text  NOT NULL ,"username" text  NOT NULL DEFAULT E'Name',
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_Friends" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "_Friends_AB_unique" ON "public"."_Friends"("A","B")

CREATE  INDEX "_Friends_B_index" ON "public"."_Friends"("B")

ALTER TABLE "public"."_Friends" ADD FOREIGN KEY ("A")REFERENCES "public"."Chef"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_Friends" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200530130708-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,28 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id       String  @default(cuid()) @id
+  name     String
+  userid   String
+  email   String @unique
+  password String
+  friends  Chef[]  @relation("Friends", references:[id])
+}
+
+model Chef {
+  id String @default(cuid()) @id
+  userid String
+  username String  @default("Name")
+  rating   String  @default("0")
+  friendof User[] @relation("Friends", references:[id])
+}
```


