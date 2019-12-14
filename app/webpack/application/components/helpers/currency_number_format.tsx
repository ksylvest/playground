import * as React from "react";

const STYLE = "currency";
const RATIO = 100; // i.e. cents to dollars

export const CurrencyNumberFormat: React.FC<{
  amount: number;
  currency: "CAD" | "EUR" | "USD";
}> = ({
  amount,
  currency,
}) => {
  const formatter = new Intl.NumberFormat(undefined, {
    currency,
    style: STYLE,
  });

  return <>{formatter.format(amount / RATIO)}</>;
};
