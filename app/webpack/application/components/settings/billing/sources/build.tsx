import * as React from "react";
import { useContext } from "react";

import { World } from "@application/contexts";

import { Dialog } from "./build/dialog";

export const Build: React.FC<{
  onClose(): void;
}> = ({ onClose }) => {
  const { notify } = useContext(World);

  const onCancel = (): void => {
    onClose();
  };

  const onSave = (): void => {
    notify({
      kind: "alert",
      message: `Thanks.`,
    });
    onClose();
  };

  return <Dialog onCancel={onCancel} onSave={onSave} />;
};
