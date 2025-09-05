import { useContext } from "react";

import { useMutation } from "@apollo/client/react";

import { Billing__Source, SettingsBillingSourceDefaultDocument } from "@root/app_schema";

import { World } from "@application/contexts/world";

import { Dialog } from "./default/dialog";

export const Default: React.FC<{
  source: Billing__Source;
  onClose(): void;
}> = ({ source, onClose }) => {
  const { notify } = useContext(World);
  const [submit, { loading }] = useMutation(SettingsBillingSourceDefaultDocument, {
    variables: { id: source.id },
  });

  const onContinue = async (): Promise<void> => {
    if (loading) {
      return;
    }
    await submit();
    onClose();
    notify({
      kind: "alert",
      message: `"•••• ${source.number}" is default.`,
    });
  };

  return <Dialog source={source} loading={loading} onContinue={onContinue} onCancel={onClose} />;
};
