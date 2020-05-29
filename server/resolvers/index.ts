import UserResolver from "./User";
import ChefResolver from "./Chef"

export const resolvers = [...UserResolver, ...ChefResolver];
