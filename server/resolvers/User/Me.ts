import { Resolver, Authorized, Query, Ctx } from "type-graphql";
import { GraphQLContext } from "../../utils";
import { User } from "../../models/User";
@Resolver()
export class Me {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: GraphQLContext) {
    return user;
  }
}
