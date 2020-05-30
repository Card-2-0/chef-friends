import { Resolver, Query, Ctx } from "type-graphql";
import { GraphQLContext } from "../../utils";
import { User } from "../../models/User";
import { prisma } from "../../prisma"
@Resolver()
export class Me {
  // @Authorized()
  @Query(() => User,{nullable:true})
  async me(@Ctx() { user }: GraphQLContext) {
    if(user) {
      const uwf = prisma.user.findOne({where:{id:user.id}, include:{friends:true}})
      return uwf
    }
    return user;
  }
}
