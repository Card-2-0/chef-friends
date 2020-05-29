import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { authChecker } from "./utils/authChecker";
// import { getAuthUser } from "./utils/getAuthUser";
dotenv.config();

const startServer = async () => {
  const schema = await buildSchema({ resolvers, authChecker } as any);
  const server = new ApolloServer({
    schema,
    // context: async ({ req, connection }) => {
    //   const user = await getAuthUser({ req, connection });
    //   return { user };
    // },
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
    subscriptions: {
      path: "/",
    },
  });
  server.listen(8000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startServer();
