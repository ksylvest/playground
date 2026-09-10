import { useContext } from "react";
import { useLocation, Navigate } from "react-router";

import { Flash } from "@application/types/flash";

import { World } from "@application/contexts/world";

const AUTHORIZE_FLASH: Flash = {
  kind: "alert",
  message: "You must be authenticated to access this.",
};

export const Authorize: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const { token } = useContext(World);
  if (!token) {
    const state = { flash: AUTHORIZE_FLASH, back: location };
    return <Navigate to="/login" state={state} />;
  }
  return <>{children}</>;
};
