import * as React from "react";
import { useState } from "react";

import { Billing__Currency, Billing__Plan, Billing__Product } from "@root/app_schema";

import { Build } from "./subscribe/build";
import { Currencies } from "./subscribe/currencies";
import { List } from "./subscribe/list";

type Selection = {
  plan: Billing__Plan;
  product: Billing__Product;
};

export const Subscribe: React.FC<{
  products: Billing__Product[];
}> = ({ products }) => {
  const [currency, setCurrency] = useState<Billing__Currency | undefined>();
  const [selection, setSelection] = useState<Selection | undefined>();

  const onClose = (): void => {
    setSelection(undefined);
  };

  return (
    <>
      <Currencies currency={currency} onCurrency={setCurrency} />
      <List currency={currency} products={products} onSelect={setSelection} />
      {selection && <Build {...selection} onClose={onClose} />}
    </>
  );
};
