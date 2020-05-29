import { ObjectType, Field, ID } from "type-graphql";
import { Chef } from "./Chef";

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() userid: string;
  @Field() email : string;
  @Field(() => [Chef],{nullable:true}) friends : [Chef];
}
