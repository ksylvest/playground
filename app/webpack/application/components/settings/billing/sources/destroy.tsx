import * as React from "react";
import { useContext } from "react";

import { Billing__Source, useSettingsBillingSourceDestroyMutation } from "@root/app_schema";

import { World } from "@application/contexts";

import { Dialog } from "./destroy/dialog";

export const Destroy: React.FC<{
  source: Billing__Source;
  onClose(): void;
}> = ({ source, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: source.id };
  const [submit, { loading }] = useSettingsBillingSourceDestroyMutation({ variables });

  const onContinue = async () => {
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
