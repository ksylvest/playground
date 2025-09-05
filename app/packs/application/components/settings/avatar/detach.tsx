import { useContext, useState } from "react";

import { Button } from "tights";

import { useMutation } from "@apollo/client/react";

import { SettingsAvatarDetachDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Dialog } from "./detach/dialog";

const DEFAULT_ACTIVE = false;

export const Detach: React.FC<{
  onSave(): void;
}> = ({ onSave }) => {
  const { notify } = useContext(World);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const [submit, { loading }] = useMutation(SettingsAvatarDetachDocument);

  const open = (): void => setActive(true);
  const close = (): void => setActive(false);

  const onCancel = (): void => {
    if (loading) {
      return;
    }
    close();
  };

  const onContinue = async (): Promise<void> => {
    if (loading) {
      return;
    }
    await submit();
    close();
    notify({
      kind: "alert",
      message: "Your avatar has been reset.",
    });
    onSave();
  };

  return (
    <>
      <Button outlined fullwidth color="danger" onClick={open}>
        Clear
      </Button>
      {active && <Dialog loading={loading} onContinue={onContinue} onCancel={onCancel} />}
    </>
  );
};
