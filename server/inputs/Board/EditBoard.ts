import { InputType, Field, registerEnumType, ID } from "type-graphql";
import { BoardType } from "../../utils";

registerEnumType(BoardType, { name: "BoardType" });

@InputType()
export class EditBoardInput {
  @Field(() => ID) id: string;
  @Field() title: string;
  @Field() description: string;
  @Field(() => BoardType) type: BoardType;
}
