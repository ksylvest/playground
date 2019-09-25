import { useContext } from "react";
import { useHistory, useLocation } from "react-router";

import { World } from "@application/contexts";

interface IProps {
  action(): void;
}

export const useAuthentication = ({ action }: IProps) => {
  const { session } = useContext(World);
  const location = useLocation();
  const history = useHistory();

  return () => {
    if (!session) {
      history!.replace(location!.pathname, { auth: !!action });
      return;
    }
    action();
  };
};
