import { useContext } from "react";

import { useMutation } from "@apollo/client/react";

import { SettingsAvatarAttachDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Uploader } from "@application/components/uploader";

export const Attach: React.FC<{
  onSave(): void;
}> = ({ onSave }) => {
  const { notify } = useContext(World);
  const [submit, { loading }] = useMutation(SettingsAvatarAttachDocument);

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
