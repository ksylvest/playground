import * as React from "react";
import { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { IFlash } from "@application/types";

import { LOGIN_URL } from "@application/config/routes";

import { World } from "@application/contexts";

const AUTHORIZE_FLASH: IFlash = {
  kind: "alert",
  message: "You must be authenticated to access this.",
};

const Authorize: React.FC<RouteComponentProps> = ({ children, location }) => {
  const { session } = useContext(World);
  if (!session) {
    const state = { flash: AUTHORIZE_FLASH, back: location };
    return <Redirect to={{ pathname: LOGIN_URL, state }} />;
  }
  return <>{children}</>;
};

const AuthorizeWithRouter = withRouter(Authorize);
export { AuthorizeWithRouter as Authorize };
