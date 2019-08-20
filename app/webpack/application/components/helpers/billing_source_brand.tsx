import * as React from "react";

import {
  BillingBrand,
  IBillingSource,
} from "@application/types";

export const BillingSourceBrand: React.FC<{
  source: IBillingSource;
}> = ({
  source,
}) => {
  const text = (() => {
    switch (source.brand) {
      case BillingBrand.AmericanExpress: return "American Express";
      case BillingBrand.DinersClub: return "Diners Club";
      case BillingBrand.Discover: return "Discover";
      case BillingBrand.JapanCreditBureau: return "JCB";
      case BillingBrand.Mastercard: return "Mastercard";
      case BillingBrand.Visa: return "Visa";
      default: return "Unknown";
    }
  })();
  return <>{text}</>;
};
