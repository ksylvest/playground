import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { ApolloProvider } from "react-apollo";

import { CLIENT as APOLLO_CLIENT } from "@application/config/apollo";

import { World } from "@application/contexts";

import {
  IFlash,
  ISession,
} from "@application/types";

const Config: React.FC<RouteComponentProps & {
  flash?: IFlash;
  session?: ISession;
  stats?: { notifications: number };
  notify(_: IFlash): void;
  auth(_: ISession): void;
  deauth(): void;
}> = ({
  children,
  ...props
}) => (
  <World.Provider value={props}>
    <ApolloProvider client={APOLLO_CLIENT} children={children} />
  </World.Provider>
);

const ConfigWithRouter = withRouter(Config);
export { ConfigWithRouter as Config };
