import * as React from "react";

import { ApolloProvider } from "@apollo/react-hooks";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import { World } from "@application/contexts";

import { IFlash } from "@application/types";

export const Config: React.FC<{
  flash?: IFlash;
  session?: { id: string };
  stats?: { notifications: number };
  notify(_: IFlash): void;
  auth(_: { id: string }): void;
  deauth(): void;
}> = ({ children, ...props }) => (
  <World.Provider value={props}>
    <ApolloProvider client={APOLLO_CLIENT} children={children} />
  </World.Provider>
);
