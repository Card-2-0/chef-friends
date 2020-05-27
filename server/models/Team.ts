import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Board } from "./Board";

@ObjectType()
export class Team {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field(() => User) updatedBy: User;
  @Field(() => [Board]) boards: Board[];
  @Field() createdAt: string;
  @Field(() => [User]) members: User[];
}
