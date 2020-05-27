import { InputType, Field, ID } from "type-graphql";

@InputType()
export class AddBoardMembers {
  @Field(() => ID) boardId: string;
  @Field(() => [ID]) userIds: string[];
}
