import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";

import { World } from "@application/contexts";

export const useAuthentication = ({ action }: { action(): void }): (() => void) => {
  const { session } = useContext(World);
  const location = useLocation();
  const navigate = useNavigate();

  return (): void => {
    if (!session) {
      navigate(location.pathname, { state: { auth: !!action } });
      return;
    }
    action();
  };
};
