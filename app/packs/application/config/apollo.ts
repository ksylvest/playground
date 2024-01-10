import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";

export const CLIENT = new ApolloClient({
  cache: new InMemoryCache({}),
  link: from([
    new ApolloLink((operation, forward) => {
      const token = localStorage.getItem("token");

      if (token) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        }));
      }

      return forward(operation);
    }),
    new ErrorLink(({ graphQLErrors }) => {
      if (!graphQLErrors) return;
      for (const error of graphQLErrors) {
        if (error.extensions?.code === "UNAUTHORIZED") {
          localStorage.removeItem("token");
        }
      }
    }),
    new HttpLink({ uri: "/graphql" }),
  ]),
});
