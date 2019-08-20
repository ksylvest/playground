import * as React from "react";
import { useContext } from "react";

import { Context } from "@application/components/context";

import { Dialog } from "./build/dialog";

export const Build: React.FC<{
  onClose(): void;
}> = ({
  onClose,
}) => {
  const { notify } = useContext(Context);

  const onCancel = () => {
    onClose();
  };

  const onSave = () => {
    notify({
      kind: "alert",
      message: `Thanks.`,
    });
    onClose();
  };

  return <Dialog onCancel={onCancel} onSave={onSave} />;
};
