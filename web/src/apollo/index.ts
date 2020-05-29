//@ts-nocheck

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8000",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000",
  headers: {
    authorization: localStorage.getItem("authToken")
      ? `Bearer ${localStorage.getItem("authToken")}`
      : undefined,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});