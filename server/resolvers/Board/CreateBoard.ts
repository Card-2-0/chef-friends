import { Resolver, Mutation, Authorized, Arg, Ctx } from "type-graphql";
import { CreateBoardInput } from "../../inputs/Board/CreateBoard";
import { GraphQLContext, BoardType } from "../../utils";
import { prisma } from "../../prisma";

@Resolver()
export class CreateBoard {
  @Authorized()
  @Mutation(() => Boolean)
  async createBoard(
    @Arg("data") { userIds, type, teamId, ...rest }: CreateBoardInput,
    @Ctx() { user }: GraphQLContext
  ) {
    if (!user) throw new Error();
    let users: string[] = [];
    if (type === BoardType.TEAM) {
      userIds.push(user.id);
      users = userIds;
    } else {
      users = [user.id];
    }
    let board: any = null;
    if (teamId) {
      board = await prisma.board.create({
        data: {
          ...rest,
          type,
          members: { connect: users.map((id) => ({ id })) },
          team: { connect: { id: teamId } },
          updatedBy: { connect: { id: user.id } },
        },
      });
    } else {
      board = await prisma.board.create({
        data: {
          ...rest,
          type,
          members: { connect: users.map((id) => ({ id })) },
          team: null,
          updatedBy: { connect: { id: user.id } },
        },
      });
    }

    return !!board;
  }
}
