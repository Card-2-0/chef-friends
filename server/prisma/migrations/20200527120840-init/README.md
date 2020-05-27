# Migration `20200527120840-init`

This migration has been generated at 5/27/2020, 12:08:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "BoardType" AS ENUM ('PRIVATE', 'PUBLIC', 'TEAM');

CREATE TYPE "ListPriority" AS ENUM ('LOW', 'HIGH');

CREATE TYPE "CardPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

CREATE TYPE "CardStatus" AS ENUM ('PENDING', 'COMPLETED');

CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Board" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"description" text  NOT NULL ,"id" text  NOT NULL ,"teamId" text   ,"title" text  NOT NULL ,"type" "BoardType" NOT NULL DEFAULT E'PRIVATE',"updatedById" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Team" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"name" text  NOT NULL ,"updatedById" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."List" (
"boardId" text   ,"id" text  NOT NULL ,"priority" "ListPriority" NOT NULL DEFAULT E'LOW',"title" text  NOT NULL ,"updatedById" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Card" (
"description" text  NOT NULL ,"id" text  NOT NULL ,"listId" text  NOT NULL ,"priority" "CardPriority" NOT NULL DEFAULT E'LOW',"status" "CardStatus" NOT NULL DEFAULT E'PENDING',"title" text  NOT NULL ,"updatedById" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Chat" (
"description" text  NOT NULL ,"id" text  NOT NULL ,"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_BoardMembers" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE TABLE "public"."_TeamMembers" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "_BoardMembers_AB_unique" ON "public"."_BoardMembers"("A","B")

CREATE  INDEX "_BoardMembers_B_index" ON "public"."_BoardMembers"("B")

CREATE UNIQUE INDEX "_TeamMembers_AB_unique" ON "public"."_TeamMembers"("A","B")

CREATE  INDEX "_TeamMembers_B_index" ON "public"."_TeamMembers"("B")

ALTER TABLE "public"."Board" ADD FOREIGN KEY ("teamId")REFERENCES "public"."Team"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Board" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Team" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."List" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."List" ADD FOREIGN KEY ("boardId")REFERENCES "public"."Board"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Card" ADD FOREIGN KEY ("listId")REFERENCES "public"."List"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Card" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_BoardMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."Board"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_BoardMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."Team"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200527120840-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,93 @@
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
+  email    String  @unique
+  password String
+  boards   Board[] @relation("BoardMembers")
+  teams    Team[]  @relation("TeamMembers")
+}
+
+model Board {
+  id          String    @default(cuid()) @id
+  title       String
+  description String
+  createdAt   DateTime  @default(now())
+  type        BoardType @default(PRIVATE)
+  team        Team?     @relation("TeamBoards", fields: [teamId], references: [id])
+  teamId      String?
+  members     User[]    @relation("BoardMembers")
+  lists       List[]
+  updatedBy   User      @relation("BoardUpdatedBy", fields: [updatedById], references: [id])
+  updatedById String
+}
+
+model Team {
+  id          String   @default(cuid()) @id
+  members     User[]   @relation("TeamMembers")
+  name        String
+  updatedBy   User     @relation("TeamUpdatedBy", fields: [updatedById], references: [id])
+  updatedById String
+  boards      Board[]  @relation("TeamBoards")
+  createdAt   DateTime @default(now())
+}
+
+model List {
+  id          String       @default(cuid()) @id
+  title       String
+  priority    ListPriority @default(LOW)
+  cards       Card[]       @relation("CardLists")
+  updatedBy   User         @relation("ListUpdatedBy", fields: [updatedById], references: [id])
+  updatedById String
+}
+
+model Card {
+  id          String       @default(cuid()) @id
+  title       String
+  description String
+  List        List         @relation("CardLists", references: [id], fields: [listId])
+  listId      String
+  priority    CardPriority @default(LOW)
+  status      CardStatus   @default(PENDING)
+  updatedBy   User         @relation("CardUpdatedBy", fields: [updatedById], references: [id])
+  updatedById String
+}
+
+model Chat {
+  id          String @default(cuid()) @id
+  title       String
+  description String
+}
+
+enum BoardType {
+  PRIVATE
+  PUBLIC
+  TEAM
+}
+
+enum ListPriority {
+  LOW
+  HIGH
+}
+
+enum CardPriority {
+  LOW
+  MEDIUM
+  HIGH
+}
+
+enum CardStatus {
+  PENDING
+  COMPLETED
+}
```


