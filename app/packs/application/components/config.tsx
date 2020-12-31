import * as React from "react";

import { ApolloProvider } from "@apollo/client";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import { World } from "@application/contexts";

import { Flash } from "@application/types";

export const Config: React.FC<{
  flash?: Flash;
  session?: { id: string };
  stats?: { notifications: number };
  notify(_: Flash): void;
  auth(_: { id: string }): void;
  deauth(): void;
}> = ({ children, ...props }) => (
  <World.Provider value={props}>
    <ApolloProvider client={APOLLO_CLIENT} children={children} />
  </World.Provider>
);
