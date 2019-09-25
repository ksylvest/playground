import * as React from "react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Redirect } from "react-router-dom";

import { IFlash } from "@application/types";

import { LOGIN_URL } from "@application/config/routes";

import { World } from "@application/contexts";

const AUTHORIZE_FLASH: IFlash = {
  kind: "alert",
  message: "You must be authenticated to access this.",
};

export const Authorize: React.FC = ({ children }) => {
  const location = useLocation();
  const { session } = useContext(World);
  if (!session) {
    const state = { flash: AUTHORIZE_FLASH, back: location };
    return <Redirect to={{ pathname: LOGIN_URL, state }} />;
  }
  return <>{children}</>;
};
