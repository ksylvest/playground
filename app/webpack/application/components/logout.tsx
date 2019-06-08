import * as React from "react";
import { useContext } from "react";
import { useMutation } from "urql";

import { Context } from "./context";

import * as MUTATION from "./logout/mutation.gql";

interface IMutationData {
  logout: {
    status: string;
  };
}

export const Logout: React.FC<{
  children(props: {
    fetching: boolean;
    logout(): void;
  }): React.ReactNode;
}> = ({ children }) => {
  const { deauth } = useContext(Context);
  const [{ fetching }, submit] = useMutation<IMutationData>(MUTATION);
  return (
    <>
      {children({
        fetching,
        logout: async () => {
          await submit();
          deauth();
        },
      })}
    </>
  );
};
