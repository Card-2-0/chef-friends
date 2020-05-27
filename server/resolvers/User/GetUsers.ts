import { Resolver, Query } from "type-graphql";
import { prisma } from "../../prisma";
import { User } from "../../models/User";

@Resolver(User)
export class GetUsers {
  @Query(() => [User])
  async getUsers() {
    return await prisma.user.findMany();
  }
}
