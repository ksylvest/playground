import { useContext } from "react";

import { useMutation } from "@apollo/client/react";

import { AuthenticationFragment, SettingsAuthenticationDestroyDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Dialog } from "./revoke/dialog";

export const Revoke: React.FC<{
  authentication: AuthenticationFragment;
  onClose(): void;
}> = ({ authentication, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: authentication.id };
  const [submit, { loading }] = useMutation(SettingsAuthenticationDestroyDocument, {
    variables,
  });

  const onContinue = async (): Promise<void> => {
    if (loading) {
      return;
    }
    await submit();
    onClose();
    notify({
      kind: "alert",
      message: `The authentication "${authentication.ip}" is revoked.`,
    });
  };

  return <Dialog authentication={authentication} loading={loading} onContinue={onContinue} onCancel={onClose} />;
};
