import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "unfetch";

export const CLIENT = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "/graphql",
    fetch: fetch as any,
  }),
});
