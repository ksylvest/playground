import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "unfetch";

export const CLIENT = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Billing__Customer: {
        fields: {
          sources: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: "/graphql",
    fetch: fetch as any,
  }),
});
