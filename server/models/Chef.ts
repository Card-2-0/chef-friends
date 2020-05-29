import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Chef {
  @Field(() => ID) id: string;
  @Field() username: string;
  @Field() userid: string;
  @Field() rating : string;
  @Field(() => [User], {nullable:true}) friendof : [User];
}