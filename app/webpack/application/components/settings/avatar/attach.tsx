import * as React from "react";
import { useContext } from "react";

import { useSettingsAvatarAttachMutation } from "@root/app_schema";

import { World } from "@application/contexts";

import { Uploader } from "@application/components/uploader";

export const Attach: React.FC<{
  onSave(): void;
}> = ({ onSave }) => {
  const { notify } = useContext(World);
  const [submit, { loading }] = useSettingsAvatarAttachMutation();

  const onSelect = async (id: string): Promise<void> => {
    if (loading) {
      return;
    }
    await submit({ variables: { id } });
    notify({
      kind: "alert",
      message: "Your avatar has been saved.",
    });
    onSave();
  };

  return <Uploader name="avatar" onSelect={onSelect} />;
};
