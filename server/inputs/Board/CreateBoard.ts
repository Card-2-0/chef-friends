import { InputType, Field, ID, registerEnumType } from "type-graphql";
import { BoardType } from "../../utils";

registerEnumType(BoardType, { name: "BoardType" });

@InputType()
export class CreateBoardInput {
  @Field() title: string;
  @Field() description: string;
  @Field(() => BoardType) type: BoardType;
  @Field({ nullable: true }) teamId: string;
  @Field(() => [ID], { nullable: true }) userIds: string[];
}
