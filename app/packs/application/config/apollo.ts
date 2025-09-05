import { ApolloClient, ApolloLink, CombinedGraphQLErrors, HttpLink, InMemoryCache } from "@apollo/client/core";
import { ErrorLink } from "@apollo/client/link/error";

const ERROR_LINK = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const { extensions } of error.errors) {
      if (extensions?.code === "UNAUTHENTICATED") {
        localStorage.removeItem("token");
        break;
      }
    }
  }
});

const APOLLO_LINK = new ApolloLink((operation, forward) => {
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
});

const HTTP_LINK = new HttpLink({ uri: "/graphql" });

export const CLIENT = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([APOLLO_LINK, ERROR_LINK, HTTP_LINK]),
});
