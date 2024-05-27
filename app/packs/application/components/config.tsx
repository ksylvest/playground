import React from "react";

import { ApolloProvider } from "@apollo/client";

import { Flash } from "@application/types/flash";
import { Stats } from "@application/types/stats";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import { World } from "@application/contexts/world";

export const Config: React.FC<{
  token?: string;
  flash?: Flash;
  stats?: Stats;
  notify(_: Flash): void;
  auth(_: string): void;
  deauth(): void;
  children?: React.ReactNode;
}> = ({ children, ...props }) => (
  <World.Provider value={props}>
    <ApolloProvider client={APOLLO_CLIENT} children={children} />
  </World.Provider>
);
