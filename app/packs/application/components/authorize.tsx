import * as React from "react";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

import { Flash } from "@application/types";

import { World } from "@application/contexts";

const AUTHORIZE_FLASH: Flash = {
  kind: "alert",
  message: "You must be authenticated to access this.",
};

export const Authorize: React.FC = ({ children }) => {
  const location = useLocation();
  const { session } = useContext(World);
  if (!session) {
    const state = { flash: AUTHORIZE_FLASH, back: location };
    return <Navigate to="/login" state={state} />;
  }
  return <>{children}</>;
};
