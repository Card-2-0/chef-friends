import { ObjectType, Field, ID } from "type-graphql";
import { Board } from "./Board";
import { Team } from "./Team";

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() email: string;
  @Field(() => [Board]) boards: Board[];
  @Field(() => [Team]) teams: Team[];
}
