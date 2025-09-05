import { useContext } from "react";

import { useMutation } from "@apollo/client/react";

import { Billing__Source, SettingsBillingSourceDestroyDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Dialog } from "./destroy/dialog";

export const Destroy: React.FC<{
  source: Billing__Source;
  onClose(): void;
}> = ({ source, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: source.id };
  const [submit, { loading }] = useMutation(SettingsBillingSourceDestroyDocument, {
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
      message: `"•••• ${source.number}" is removed.`,
    });
  };

  return <Dialog source={source} loading={loading} onContinue={onContinue} onCancel={onClose} />;
};
