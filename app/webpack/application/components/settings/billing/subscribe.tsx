import * as React from "react";
import { useState } from "react";

import {
  BillingCurrency,
  IBillingPlan,
  IBillingProduct,
} from "@application/types";

import { Build } from "./subscribe/build";
import { Currencies } from "./subscribe/currencies";
import { List } from "./subscribe/list";

export const Subscribe: React.FC<{
  products: IBillingProduct[];
  refetch(): void;
}> = ({
  products,
  refetch,
}) => {
  const [currency, setCurrency] = useState<BillingCurrency | undefined>(undefined);
  const [selection, setSelection] = useState<{
    plan: IBillingPlan;
    product: IBillingProduct;
  } | undefined>(undefined);

  const onClose = () => {
    setSelection(undefined);
    refetch();
  };

  return (
    <>
      <Currencies
        currency={currency}
        onCurrency={setCurrency}
      />
      <List
        currency={currency}
        products={products}
        onSelect={setSelection}
      />
      {selection &&
        <Build {...selection} onClose={onClose} />
      }
    </>
  );
};
