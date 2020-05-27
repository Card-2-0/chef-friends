import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql";
import { GraphQLContext } from "../../utils";
import { EditBoardInput } from "../../inputs/Board/EditBoard";
import { prisma } from "../../prisma";

@Resolver()
export class EditBoard {
  @Authorized()
  @Mutation(() => Boolean)
  async editBoard(
    @Arg("data") { id, title, description, type }: EditBoardInput,
    @Ctx() { user }: GraphQLContext
  ) {
    if (!user) return null;
    const board = await prisma.board.update({
      where: { id },
      data: {
        title,
        description,
        type,
        updatedBy: { connect: { id: user.id } },
      },
    });

    return !!board;
  }
}
