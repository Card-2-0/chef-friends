import { User } from "@prisma/client";

export interface GraphQLContext {
  user: User | null;
}

export enum BoardType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  TEAM = "TEAM",
}

export enum CardStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum CardPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
export enum ListPriority {
  LOW = "LOW",
  HIGH = "HIGH",
}
