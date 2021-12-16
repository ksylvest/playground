import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";

import { World } from "@application/contexts";

export const useAuthentication = ({ action }: { action(): void }): (() => void) => {
  const { authentication } = useContext(World);
  const location = useLocation();
  const navigate = useNavigate();

  return (): void => {
    if (!authentication) {
      navigate(location.pathname, { state: { auth: !!action } });
      return;
    }
    action();
  };
};
