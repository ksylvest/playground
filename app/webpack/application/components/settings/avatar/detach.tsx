import * as React from "react";
import { useContext, useState } from "react";

import { useSettingsAvatarDetachMutation } from "@root/app_schema";

import { Button } from "tights";

import { World } from "@application/contexts";

import { Dialog } from "./detach/dialog";

const DEFAULT_ACTIVE = false;

export const Detach: React.FC<{
  onSave(): void;
}> = ({ onSave }) => {
  const { notify } = useContext(World);
  const [active, setActive] = useState<boolean>(DEFAULT_ACTIVE);
  const [submit, { loading }] = useSettingsAvatarDetachMutation();

  const open = () => setActive(true);
  const close = () => setActive(false);

  const onCancel = () => {
    if (loading) {
      return;
    }
    close();
  };

  const onContinue = async () => {
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
