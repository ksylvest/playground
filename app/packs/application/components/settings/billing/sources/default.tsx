import * as React from "react";
import { useContext } from "react";

import { Billing__PaymentMethod, useSettingsBillingPaymentMethodDefaultMutation } from "@root/app_schema";

import { World } from "@application/contexts";

import { Dialog } from "./default/dialog";

export const Default: React.FC<{
  source: Billing__PaymentMethod;
  onClose(): void;
}> = ({ source, onClose }) => {
  const { notify } = useContext(World);
  const variables = { id: source.id };
  const [submit, { loading }] = useSettingsBillingPaymentMethodDefaultMutation({ variables });

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
