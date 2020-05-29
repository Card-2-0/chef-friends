import { InputType, Field } from "type-graphql";

@InputType()
export class AddChefInput {
  @Field() userid: string;
  @Field() useradding: string;
}
