import BoardResolver from "./Board";
import UserResolver from "./User";
export const resolvers = [...BoardResolver, ...UserResolver];
