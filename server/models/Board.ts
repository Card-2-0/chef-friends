import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { List } from "./List";
import { BoardType } from "../utils";
import { Team } from "./Team";
import { User } from "./User";

registerEnumType(BoardType, { name: "BoardType" });

@ObjectType()
export class Board {
  @Field(() => ID) id: string;
  @Field() title: string;
  @Field() description: string;
  @Field() createdAt: string;
  @Field(() => BoardType) type: BoardType;
  @Field(() => Team, { nullable: true }) team: Team;
  @Field(() => [User]) members: User[];
  @Field(() => [List]) lists: List[];
  @Field(() => User) updatedBy: User;
}
