import * as React from "react";
import { useContext } from "react";
import { useMutation } from "react-apollo";

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
  }): React.ReactElement;
}> = ({ children }) => {
  const { deauth } = useContext(Context);
  const [submit, { loading }] = useMutation<IMutationData>(MUTATION);

  return children({
    loading,
    logout: async () => {
      if (loading) { return; }
      await submit();
      deauth();
    },
  });
};
