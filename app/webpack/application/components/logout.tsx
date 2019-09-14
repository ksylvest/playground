import * as React from "react";
import { useContext } from "react";

import { useLogoutMutation } from "@root/app_schema";

import { World } from "@application/contexts";

export const Logout: React.FC<{
  children(props: { loading: boolean; logout(): void }): React.ReactElement;
}> = ({ children }) => {
  const { deauth } = useContext(World);
  const [submit, { loading }] = useLogoutMutation();

  return children({
    loading,
    logout: async () => {
      if (loading) {
        return;
      }
      await submit();
      deauth();
    },
  });
};
