import { useContext } from "react";
import { useHistory, useLocation } from "react-router";

import { World } from "@application/contexts";

export const useAuthentication = ({ action }: { action(): void }): (() => void) => {
  const { session } = useContext(World);
  const location = useLocation();
  const history = useHistory();

  return (): void => {
    if (!session) {
      history.replace(location.pathname, { auth: !!action });
      return;
    }
    action();
  };
};
