import * as React from "react";
import { useContext } from "react";

import { SessionFragment, useSettingsSessionRevokeMutation } from "@root/app_schema";

import { World } from "@application/contexts";

import { Dialog } from "./revoke/dialog";

export const Revoke: React.FC<{
  session: SessionFragment;
  onClose(): void;
}> = ({ session, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: session.id };
  const [submit, { loading }] = useSettingsSessionRevokeMutation({ variables });

  const onContinue = async (): Promise<void> => {
    if (loading) {
      return;
    }
    await submit();
    onClose();
    notify({
      kind: "alert",
      message: `The session "${session.ip}" is revoked.`,
    });
  };

  return <Dialog session={session} loading={loading} onContinue={onContinue} onCancel={onClose} />;
};
