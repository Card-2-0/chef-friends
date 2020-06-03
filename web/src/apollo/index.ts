//@ts-nocheck

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import './../components/Mystyles.css'

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8000",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("chef")}`,
    },
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000",
  headers: {
    authorization: localStorage.getItem("chef")
      ? `Bearer ${localStorage.getItem("chef")}`
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
