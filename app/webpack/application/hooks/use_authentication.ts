import { useContext } from "react";

import { World } from "@application/contexts";

interface IProps {
  action(): void;
}

export const useAuthentication = ({ action }: IProps) => {
  const { location, history, session } = useContext(World);

  return () => {
    if (!session) {
      history!.replace(location!.pathname, { auth: !!action });
      return;
    }
    action();
  };
};
