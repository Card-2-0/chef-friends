import UserResolver from "./User";
import Fetch from './Fetch'
export const resolvers = [...UserResolver, Fetch];
