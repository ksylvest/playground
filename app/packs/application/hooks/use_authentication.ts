import { useContext } from "react";
import { useNavigate, useLocation } from "react-router";

import { World } from "@application/contexts/world";

export const useAuthentication = ({ action }: { action(): void }): (() => void) => {
  const { token } = useContext(World);
  const location = useLocation();
  const navigate = useNavigate();

  return (): void => {
    if (!token) {
      navigate(location.pathname, { state: { auth: !!action } });
      return;
    }
    action();
  };
};
