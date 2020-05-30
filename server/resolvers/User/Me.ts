import { Resolver, Query, Ctx } from "type-graphql";
import { GraphQLContext } from "../../utils";
import { User } from "../../models/User";
@Resolver()
export class Me {
  // @Authorized()
  @Query(() => User,{nullable:true})
  async me(@Ctx() { user }: GraphQLContext) {
    return user;
  }
}
