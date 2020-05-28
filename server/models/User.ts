import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() userId: string;
  @Field() rating: string;
  @Field(() => [User]) friends: User[];
}
