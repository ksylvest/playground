import * as React from "react";
import { useContext } from "react";
import { Mutation } from "react-apollo";

import { Context } from "./context";

import * as MUTATION from "./logout/mutation.gql";

interface IMutationData {
  logout: {
    status: string;
  };
}

export const Logout: React.FC<{
  children(props: {
    loading: boolean;
    logout(): void;
  }): React.ReactNode;
}> = ({ children }) => {
  const { deauth } = useContext(Context);
  return (
    <Mutation<IMutationData> mutation={MUTATION}>
      {(logout, { loading }) => children({
        loading,
        logout: async () => {
          await logout();
          deauth();
        },
      })}
    </Mutation>
  );
};
