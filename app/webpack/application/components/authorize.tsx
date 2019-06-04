import * as React from "react";
import { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import { IFlash } from "@application/types";

import { LOGIN_URL } from "@application/config/routes";

import { Context } from "./context";

const AUTHORIZE_FLASH: IFlash = {
  kind: "alert",
  message: "You must be authenticated to access this.",
};

const Authorize: React.FC<RouteComponentProps> = ({ children, location }) => {
  const { session } = useContext(Context);
  if (!session) {
    const state = { flash: AUTHORIZE_FLASH, back: location };
    return <Redirect to={{ pathname: LOGIN_URL, state }} />;
  }
  return <>{children}</>;
};

const AuthorizeWithRouter = withRouter(Authorize);
export { AuthorizeWithRouter as Authorize };
