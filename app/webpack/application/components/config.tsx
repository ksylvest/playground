import * as React from "react";

import { ApolloProvider } from "react-apollo";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

export const Config: React.FC = ({
  children,
}) => (
  <ApolloProvider client={APOLLO_CLIENT} children={children} />
);
