import { Resolver, Query } from "type-graphql";
import { prisma } from "../../prisma";
import { Chef } from "../../models/Chef";

@Resolver(Chef)
export class GetChefs {
  @Query(() => [Chef])
  async getChefs() {
    return await prisma.chef.findMany({include:{friendof:true}});
  }
}
