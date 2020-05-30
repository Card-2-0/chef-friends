import { Resolver, Query, Arg } from "type-graphql";
import { prisma } from "../../prisma";
import { Chef } from "../../models/Chef";

@Resolver(Chef)
export class GetChef {
  @Query(() => Chef)
  async getChef(@Arg("userid") userid:string) {
    const myinfo = await prisma.chef.findMany({where:{userid},include:{friendof:true}})
    return myinfo[0];
  }
}
