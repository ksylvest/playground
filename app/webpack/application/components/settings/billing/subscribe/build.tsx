import * as React from "react";
import { useContext } from "react";

import { Billing__Plan, Billing__Product } from "@root/app_schema";

import { World } from "@application/contexts";

import { Dialog } from "./build/dialog";

export const Build: React.FC<{
  plan: Billing__Plan;
  product: Billing__Product;
  onClose(): void;
}> = ({ plan, product, onClose }) => {
  const { notify } = useContext(World);

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

  return <Dialog plan={plan} product={product} onCancel={onCancel} onSave={onSave} />;
};
