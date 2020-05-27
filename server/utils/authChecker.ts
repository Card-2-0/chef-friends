import { AuthChecker } from "type-graphql";
import dotenv from "dotenv";
import { GraphQLContext } from ".";
dotenv.config();
export const authChecker: AuthChecker<GraphQLContext> = async ({
  context: { user },
}) => {
  if (!user) return false;
  return true;
};
