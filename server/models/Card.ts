import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { List } from "./List";
import { CardPriority } from "../utils";
import { User } from "./User";

registerEnumType(CardPriority, { name: "CardPriority" });

@ObjectType()
export class Card {
  @Field(() => ID) id: string;
  @Field() title: string;
  @Field() description: string;
  @Field(() => List) list: List;
  @Field(() => CardPriority) priority: CardPriority;
  @Field(() => User) updatedBy: User;
}
