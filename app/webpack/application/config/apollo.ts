import ApolloClient from "apollo-boost";
import fetch from "unfetch";

export const CLIENT = new ApolloClient({
  fetch,
  uri: "/graphql",
});
