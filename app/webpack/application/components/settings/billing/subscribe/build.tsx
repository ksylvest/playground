import * as React from "react";
import { useContext } from "react";

import {
  IBillingPlan,
  IBillingProduct,
} from "@application/types";

import { World } from "@application/contexts";

import { Dialog } from "./build/dialog";

export const Build: React.FC<{
  plan: IBillingPlan;
  product: IBillingProduct;
  onClose(): void;
}> = ({
  plan,
  product,
  onClose,
}) => {
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

  return (
    <Dialog
      plan={plan}
      product={product}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
