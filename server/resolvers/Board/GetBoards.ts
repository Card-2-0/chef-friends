import { Resolver, Query } from "type-graphql";
import { Board } from "../../models/Board";
import { prisma } from "../../prisma";

@Resolver(Board)
export class GetBoards {
  @Query(() => [Board])
  async getBoards() {
    return await prisma.board.findMany();
  }
}
