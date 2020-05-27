import { Resolver, FieldResolver, Root } from "type-graphql";
import { User } from "../../models/User";
import { Team } from "../../models/Team";
import { prisma } from "../../prisma";
import { Board } from "../../models/Board";

@Resolver(User)
export class UserFieldResolver {
  @FieldResolver(() => [Team])
  teams(@Root() { id }: User) {
    return prisma.user.findOne({ where: { id } }).teams();
  }

  @FieldResolver(() => [Board])
  boards(@Root() { id }: User) {
    return prisma.user.findOne({ where: { id } }).boards();
  }
}
