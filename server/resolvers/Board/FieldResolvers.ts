import { Resolver, FieldResolver, Root } from "type-graphql";
import { Board } from "../../models/Board";
import { Card } from "../../models/Card";
import { prisma } from "../../prisma";
import { User } from "../../models/User";

@Resolver(Board)
export class BoardFieldResolver {
  @FieldResolver(() => [Card])
  cards(@Root() { id }: Board) {
    return prisma.board.findOne({ where: { id } }).lists();
  }

  @FieldResolver(() => [User])
  members(@Root() { id }: Board) {
    return prisma.board.findOne({ where: { id } }).members();
  }
}
