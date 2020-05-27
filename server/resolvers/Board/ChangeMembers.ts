import { Resolver, Authorized, Mutation, Arg } from "type-graphql";
import { AddBoardMembers } from "../../inputs/Board/AddBoardMembers";
import { prisma } from "../../prisma";

@Resolver()
export class ChangeMembers {
  @Authorized()
  @Mutation(() => Boolean)
  async addBoardMembers(@Arg("data") { boardId, userIds }: AddBoardMembers) {
    const board = await prisma.board.update({
      where: { id: boardId },
      data: {
        members: { connect: userIds.map((id) => ({ id })) },
      },
    });
    return !!board;
  }
}
