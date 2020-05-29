import { InputType, Field } from "type-graphql";

@InputType()
export class RemoveChefInput {
  @Field() userid: string;
  @Field() userremove: string;
}
