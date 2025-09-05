import { useContext } from "react";

import { useMutation } from "@apollo/client/react";

import { LogoutDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

export const Logout: React.FC<{
  children(props: { loading: boolean; logout(): void }): React.ReactElement;
}> = ({ children }) => {
  const { deauth } = useContext(World);
  const [submit, { loading }] = useMutation(LogoutDocument);

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
