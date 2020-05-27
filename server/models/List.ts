import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { ListPriority } from "../utils";
import { Card } from "./Card";
import { User } from "./User";

registerEnumType(ListPriority, { name: "ListPriority" });

@ObjectType()
export class List {
  @Field(() => ID) id: string;
  @Field() title: string;
  @Field(() => ListPriority) priority: ListPriority;
  @Field(() => [Card]) cards: Card[];
  @Field(() => User) updatedBy: User;
}
