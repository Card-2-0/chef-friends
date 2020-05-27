import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field() name: string;
  @Field() email: string;
  @Field() password: string;
}
